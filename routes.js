const users = require("./methods/users");
const arananlar = require("./methods/arananlar");
const auth = require("./methods/auth");
const {verifyJWT_MW} = require("./utils");

users.sync();
arananlar.sync();

const authRoutes = app => {
    app.get("/api/auth/autherized", auth.isAutherized);
    app.post("/api/auth/login", auth.login);
    app.post("/api/auth/logout", auth.logout);
};

const userRoutes = app => {
    app.post("/api/users/create", users.create);
    app.get("/api/users/fetchData", users.fetchData);
    app.post("/api/users/fetchData", users.fetchData);
    app.post("/api/users/update", users.update);
    app.post("/api/users/deleteRecord", users.deleteRecord);
};

const arananlarRoutes = app => {
    app.get("/api/arananlar/fetchData", arananlar.fetchData);
    app.post("/api/arananlar/fetchData", arananlar.fetchData);
    app.post("/api/arananlar/create", arananlar.create);
    app.post("/api/arananlar/deleteRecord", arananlar.deleteRecord);
    app.post("/api/arananlar/update", arananlar.update);
};


module.exports = app => {
    /* The following endpoints are public.*/
    app.get("/api", (req, res) =>
        res.status(200).send({
            message: "Welcome to the JSF API!"
        })
    );
    authRoutes(app);

    /* The above endpoints are public.*/
    /* verifyJWT_MW is an authorization controller. */
   //app.all('*', verifyJWT_MW);

    /* The following endpoints are protected.*/
    userRoutes(app);
    arananlarRoutes(app);
};
