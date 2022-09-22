// Validation
import { body, param } from "express-validator";
// Complements
import { createValidator, cleanResponseArray, addTime } from '~/Helpers';
import * as constants                                   from '~/Config/constants';
// Require Own Modules
import Account from "./Accounts.model";

// Craeate Account Function and Validator
const createAccountValidation = createValidator([
	body("cash").notEmpty().isNumeric()
]);
const createAccountFunction = async (req, res) => {
    try {
        let newData = req.body;    
        let auxAccount = new Account(newData);
        // Save data
        await auxAccount.save();

        return res.status(201).send({
            id: auxAccount._id,
            cash: auxAccount.cash,
            issuers: auxAccount.issuers
        });                            
    }
    catch (err) {
        console.error("[Accounts.Controller -> createAccount] ", err);
		return res.status(500).send({ err : constants.FATAL_ERROR });
    }
};
export const createAccount = [ createAccountValidation, createAccountFunction ];

// Sell and Buy Function and Validator
const buysellValidation = createValidator([
	param("id").notEmpty().isString(),
	body("timestamp").notEmpty().isNumeric(),
	body("operation").notEmpty().isString(),
	body("issuer_name").notEmpty().isString(),
	body("total_shares").notEmpty().isNumeric(),
    body("share_price").notEmpty().isNumeric()
]);
const buysellFunction = async (req, res) => {
    try {
        let id = req.params.id;
        let newData = req.body;
        const date = new Date();     

        // Validation if exist account
        const account = await Account.findOne({ _id: id }).exec();
        if (!account) {
            return res.status(404).send({ 
                current_balance: {
                    cash: 0,
                    issuers: []
                },
                business_errors: [
                    constants.ACCOUNT_NOT_FOUND
                ]
            });
        } 

        // Validation of duplicate operation
        const dateIn = new Date(newData.timestamp * 1e3).toISOString().slice(-13, -5);
        const lastDate = new Date(account.last_operation.timestamp * 1e3).toISOString().slice(-13, -5);
        const dayIn = new Date(newData.timestamp * 1000).getDate();
        const lastDay = new Date(account.last_operation.timestamp * 1000).getDate();
        if (addTime(lastDate) > dateIn && account.last_operation.issuer_name === newData.issuer_name && dayIn === lastDay) {
            return res.status(400).send({ 
                current_balance: {
                    cash: account.cash,
                    issuers: cleanResponseArray(account.issuers)
                },
                business_errors: [
                    constants.DUPLICATE_OPERATION
                ]
            });
        }

        // Validation of open hours market
        if(constants.START_HOUR <= dateIn && dateIn <= constants.END_HOUR) {      
            // BUY SEGMENT      
            if(newData.operation === "BUY") {
                const totalInvest = newData.share_price * newData.total_shares;
                if (account.cash < totalInvest) {
                    return res.status(400).send({ 
                        current_balance: {
                            cash: account.cash,
                            issuers: cleanResponseArray(account.issuers)
                        },
                        business_errors: [
                            constants.INSUFFICIENT_BALANCE
                        ]
                    });
                }
                const index = account.issuers.findIndex(item => item.issuer_name === newData.issuer_name);
                if (index > -1) {
                    account.issuers[index].total_shares = account.issuers[index].total_shares + newData.total_shares;
                }
                else {
                    account.issuers = [
                        ...(account?.issuers ?? []),
                        {
                            issuer_name: newData.issuer_name,
                            total_shares: newData.total_shares,
                            share_price: newData.share_price
                        },
                    ]; 
                }
                account.cash = account.cash - totalInvest;
                account.last_operation = {
                    issuer_name: newData.issuer_name,
                    timestamp: newData.timestamp,
                };
                // Update Data
                await Account.updateOne({ _id: id }, account).exec();
                return res.status(201).send({ 
                    current_balance: {
                        cash: account.cash,
                        issuers: cleanResponseArray(account.issuers)
                    },
                    business_errors: []
                });
            }
            // SELL SEGMENT
            else if(newData.operation === "SELL") {
                const index = account.issuers.findIndex(item => item.issuer_name === newData.issuer_name);
                if (index > -1) {
                    if (account.issuers[index].total_shares < newData.total_shares || newData.total_shares < 1) {
                        return res.status(400).send({ 
                            current_balance: {
                                cash: account.cash,
                                issuers: cleanResponseArray(account.issuers)
                            },
                            business_errors: [
                                constants.INSUFFICIENT_STOCK
                            ]
                        });
                    }
                    account.cash = account.cash + (newData.total_shares * newData.share_price);
                    account.last_operation = {
                        issuer_name: newData.issuer_name,
                        timestamp: newData.timestamp,
                    };
                    account.issuers[index].total_shares = account.issuers[index].total_shares - newData.total_shares;
                    if(account.issuers[index].total_shares == 0) account.issuers.splice(index, 1);
                    // Update Data
                    await Account.updateOne({ _id: id }, account).exec();
                    return res.status(201).send({ 
                        current_balance: {
                            cash: account.cash,
                            issuers: cleanResponseArray(account.issuers)
                        },
                        business_errors: []
                    });
                }
                return res.status(400).send({ 
                    current_balance: {
                        cash: account.cash,
                        issuers: cleanResponseArray(account.issuers)
                    },
                    business_errors: [
                        constants.STOCK_NOT_FOUND
                    ]
                });
            }
            // INVALID OPTION SEGMENT
            else {
                return res.status(400).send({ 
                    current_balance: {
                        cash: account.cash,
                        issuers: cleanResponseArray(account.issuers)
                    },
                    business_errors: [
                        constants.INVALID_OPERATION
                    ]
                });
            }
        }
        else {
            return res.status(400).send({ 
                current_balance: {
                    cash: account.cash,
                    issuers: cleanResponseArray(account.issuers)
                },
                business_errors: [
                    constants.CLOSE_MARKET
                ]
            });
        }
    }
    catch(err) {
        console.error("[Accounts.Controller -> buysell] ", err);
		return res.status(404).send({ 
            current_balance: {
                cash: 0,
                issuers: []
            },
            business_errors: [
                constants.FATAL_ERROR
            ]
        });
    }
};
export const buysell = [ buysellValidation, buysellFunction ];