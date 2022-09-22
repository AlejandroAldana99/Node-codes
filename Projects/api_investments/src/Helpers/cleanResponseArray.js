// Clean Response Array Helper
const cleanResponseArray = (arr) => {
    return arr.map(item => {
        return {
            issuer_name: item.issuer_name,
            total_shares: item.total_shares,
            share_price: item.share_price
        }
    });
}

export default cleanResponseArray;