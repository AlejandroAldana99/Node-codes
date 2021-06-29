const routes = router => {
    router.post("/quote/send_quote", multer(upload).single('pdf'), sendQuote);
};

export default routes;

function sendQuote () {
    console.log("Data");
}