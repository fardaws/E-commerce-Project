
//simple user Signup function to add user to LS : users
function signupSimpleUser() {
    // get inputs values
    var fName = document.getElementById('fname').value;
    var lName = document.getElementById('lname').value;
    var sinupEmail = document.getElementById('sinupEmail').value;
    var phoneNumber = document.getElementById('phoneNumber').value;
    var signupPassword = document.getElementById('signupPassword').value;
    var confirmPassword = document.getElementById('confirmPassword').value;
    var idUser = JSON.parse(localStorage.getItem('idUserKey') || '1');

    //appel des fonctions // controle de saisie
    var isfNameLengthValid = checkInputLength(fName, 0);
    var islNameLengthValid = checkInputLength(lName, 0);
    var isEmailUnique = !checkEmailExist(sinupEmail);
    var isEmailFromatValid = checkFormatEmail(sinupEmail);
    var isPhoneNumberLengthValid = checkInputLength(phoneNumber, 7);
    var isPasswordMatch = checkPwdMatch(signupPassword, confirmPassword);
    var isPwdLengthValid = checkInputLength(signupPassword, 6);

    //affichage des messages d'erreurs
    displayErrorMsg(isfNameLengthValid, 'fNameErrorMsg', "First name innvalid");
    displayErrorMsg(islNameLengthValid, 'lNameErrorMsg', "Last name innvalid");
    displayErrorMsg(isEmailUnique, 'emailExistErrorMsg', "email exist!");
    displayErrorMsg(isEmailFromatValid, 'emailFormatErrorMsg', "email format innvalid");
    displayErrorMsg(isPhoneNumberLengthValid, 'phoneErrorMsg', "Phone number format innvalid");
    displayErrorMsg(isPasswordMatch, 'PwdMatchErrorMsg', "passwords don't match");
    displayErrorMsg(isPwdLengthValid, 'PwdLengthErrorMsg', "password length too short");

    //add user to LS if controle saisie is true
    if (isEmailUnique && isEmailFromatValid && isfNameLengthValid && islNameLengthValid && isPhoneNumberLengthValid && isPasswordMatch && isPwdLengthValid) {
        var user = {
            id: idUser,
            firstName: fName,
            lastName: lName,
            email: sinupEmail,
            phone: phoneNumber,
            password: signupPassword,
            confirmPassword: confirmPassword,
            role: "simple-user"
        }
        var users = JSON.parse(localStorage.getItem('users') || '[]');
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('idUserKey', idUser + 1);
    }
}

//admin user Signup function to add admin to LS : users
function signupAdminUser() {
    // get inputs values
    var adminFirstName = document.getElementById('adminFirstName').value;
    var adminLastName = document.getElementById('adminLastName').value;
    var adminSignupEmail = document.getElementById('adminSignupEmail').value;
    var adminPhoneNumber = document.getElementById('adminPhoneNumber').value;
    var adminSignupPassword = document.getElementById('adminSignupPassword').value;
    var adminConfirmPassword = document.getElementById('adminConfirmPassword').value;
    var address = document.getElementById('address').value;
    var numPatent = document.getElementById('numPatent').value;
    var companyName = document.getElementById('companyName').value;
    var fax = document.getElementById('fax').value;

    //appel des fonctions // controle de saisie
    var isEmailUnique = !checkEmailExist(adminSignupEmail); // email n'existe pas dans LS
    var isPatentUnique = !checkPatentExist(numPatent);
    var isCampanyNameUnique = !checkCompanyNameExist(companyName);
    var isfNameLengthValid = checkInputLength(adminFirstName, 0);
    var islNameLengthValid = checkInputLength(adminLastName, 0);
    var isAdminPhoneNumberValid = checkInputLength(adminPhoneNumber, 7);
    var isEmailFromatValid = checkFormatEmail(adminSignupEmail);
    var isPasswordMatch = checkPwdMatch(adminSignupPassword, adminConfirmPassword);
    var isPasswordLengthValid = checkInputLength(adminSignupPassword, 6);
    var isFaxLengthValid = checkInputLength(fax, 6);

    //affichage des messages d'erreurs
    displayErrorMsg(isEmailUnique, 'adminEmailExistErrorMsg', "Email exist!");
    displayErrorMsg(isPatentUnique, 'adminPatentErrorMsg', "Num patent exist!");
    displayErrorMsg(isCampanyNameUnique, 'adminCompanyNameErrorMsg', "Campany name exist!");
    displayErrorMsg(isfNameLengthValid, 'adminFirstNameErrorMsg', "First name innvalid");
    displayErrorMsg(islNameLengthValid, 'adminLastNameErrorMsg', "Last name innvalid");
    displayErrorMsg(isEmailFromatValid, 'AdminEmailFormatErrorMsg', "email format innvalid");
    displayErrorMsg(isPasswordMatch, 'AdminPwdMatchErrorMsg', "passwords don't match");
    displayErrorMsg(isPasswordLengthValid, 'AdminPwdLengthErrorMsg', "password length too short");
    displayErrorMsg(isAdminPhoneNumberValid, 'adminPhoneNumberErrorMsg', "Phone number format innvalid");
    displayErrorMsg(isFaxLengthValid, 'FaxNumberErrorMsg', "Fax number format innvalid");

    if (isEmailUnique && isPatentUnique && isCampanyNameUnique && isfNameLengthValid && islNameLengthValid && isEmailFromatValid && isPasswordMatch && isPasswordLengthValid && isAdminPhoneNumberValid && isFaxLengthValid) {
        var idUser = JSON.parse(localStorage.getItem('idUserKey') || '1');
        var user = {
            id: idUser,
            firstName: adminFirstName,
            lastName: adminLastName,
            email: adminSignupEmail,
            phone: adminPhoneNumber,
            password: adminSignupPassword,
            confirmPassword: adminConfirmPassword,
            address: address,
            numPatent: numPatent,
            companyName: companyName,
            fax: fax,
            role: "admin-user"
        }
        var users = JSON.parse(localStorage.getItem('users') || '[]');
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('idUserKey', idUser + 1);
    }
}

//search user by email and pwd ml LS => return user
function searchUser(email, pwd) {
    var findedUser;
    var users = JSON.parse(localStorage.getItem('users') || '[]');
    for (let i = 0; i < users.length; i++) {
        if (email == users[i].email && pwd == users[i].password) {
            findedUser = users[i];
        }
    }
    return findedUser;
}

function login() {
    var loginEmail = document.getElementById('loginEmail').value;
    var loginPassword = document.getElementById('loginPassword').value;
    var findedUser = searchUser(loginEmail, loginPassword);
    if (findedUser) {
        if (findedUser.role == "simple-user") {
            location.replace('index.html');
        } else {
            location.replace('index.html');
        }
        localStorage.setItem('connectedUserId', findedUser.id);
    } else {
        document.getElementById('errorMsg').innerHTML = "You don't have an account";
        document.getElementById('errorMsg').style.color = "red";
    }
}

//msg d'erreur mtee l controle de saisie 
function displayErrorMsg(condition, id, msg) {
    if (!condition) {
        document.getElementById(id).innerHTML = msg;
        document.getElementById(id).style.color = "red";
    } else {
        document.getElementById(id).innerHTML = "";
    }
}

//affiche true si email exist
function checkEmailExist(email) {
    var check = false;
    var users = JSON.parse(localStorage.getItem('users') || '[]');
    for (let i = 0; i < users.length; i++) {
        if (email == users[i].email) {
            check = true;
        }
    }
    return check;
}

function checkPatentExist(patent) {
    var check = false;
    var users = JSON.parse(localStorage.getItem('users') || '[]');
    for (let i = 0; i < users.length; i++) {
        if (patent == users[i].numPatent) {
            check = true;
        }
    }
    return check;
}

function checkCompanyNameExist(companyName) {
    var check = false;
    var users = JSON.parse(localStorage.getItem('users') || '[]');
    for (let i = 0; i < users.length; i++) {
        if (companyName == users[i].companyName) {
            check = true;
        }
    }
    return check;
}
//check si length mtee l input valid wale
function checkInputLength(input, length) {
    return (input.length > length) ? true : false;
}

//check format email valid wale
function checkFormatEmail(email) {
    const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regEx.test(String(email).toLowerCase());
}

//check pwd match
function checkPwdMatch(pwd1, pwd2) {
    return (pwd1 == pwd2) ? true : false;
}

function checkInputValueValid(x, value) {
    return (x > value) ? true : false;
}
//add Product to LS
function addProduct() {
    var nameProduct = document.getElementById('nameProduct').value;
    var priceProduct = document.getElementById('priceProduct').value;
    var stockProduct = document.getElementById('stockProduct').value;
    var categoryProduct = document.getElementById('categoryProduct').value;
    var idProduct = JSON.parse(localStorage.getItem('idProduct') || '1');
    var idConnectedUser = getConnectedUserFromLS();

    var isNameLengthValid = checkInputLength(nameProduct, 3);
    var isPriceLengthValid = checkInputValueValid(priceProduct, 0);
    var isStockLengthValid = checkInputValueValid(stockProduct, 10);

    displayErrorMsg(isNameLengthValid, 'nameErrorMsg', "name product is too short");
    displayErrorMsg(isPriceLengthValid, 'priceErrorMsg', "price innvalid");
    displayErrorMsg(isStockLengthValid, 'stockErrorMsg', "Values stock lower than 10 is innvalid");

    if (isNameLengthValid && isPriceLengthValid && isStockLengthValid) {
        var product = {
            id: idProduct,
            nameProduct: nameProduct,
            priceProduct: priceProduct,
            stockProduct: stockProduct,
            categoryProduct: categoryProduct,
            idUser: idConnectedUser,
            isConfirmed: false
        }
        var products = JSON.parse(localStorage.getItem('products') || '[]');
        products.push(product);
        localStorage.setItem('products', JSON.stringify(products));
        localStorage.setItem('idProduct', idProduct + 1);
    }
}
//affiche les options du tag <select> => liste des categories by user 
function generateOption() {
    var idConnectedUser = getConnectedUserFromLS();
    var categries = getObjectFromLS('categries');
    var categoryList = '';
    for (let i = 0; i < categries.length; i++) {
        if (idConnectedUser == categries[i].idUser) {
            categoryList += `<option value="${categries[i].nameCategory}">${categries[i].nameCategory}</option>`;
        }
    }
    document.getElementById('categoryProduct').innerHTML = categoryList;
}
//add Categories to LS
function addCategories() {
    var nameCategory = document.getElementById('nameCategory').value;
    var idCategory = JSON.parse(localStorage.getItem('idCategory') || '1');
    var idConnectedUser = JSON.parse(localStorage.getItem('connectedUserId'));
    var isNameCategoryLengthValid = checkInputLength(nameCategory, 1);
    displayErrorMsg(isNameCategoryLengthValid, 'nameCategoryErrorMsg', "name category is too short");
    if (isNameCategoryLengthValid) {
        var category = {
            id: idCategory,
            nameCategory: nameCategory,
            idUser: idConnectedUser
        }
        var categries = JSON.parse(localStorage.getItem('categries') || '[]');
        categries.push(category);
        localStorage.setItem('categries', JSON.stringify(categries));
        localStorage.setItem('idCategory', idCategory + 1);
    }
}

function getObjectFromLS(key) {
    return JSON.parse(localStorage.getItem(key) || '[]');
}

function getConnectedUserFromLS() {
    return connectedUserId = localStorage.getItem('connectedUserId');
}

function displayUserProducts() {
    var products = getObjectFromLS('products');
    var connectedUserId = getConnectedUserFromLS();
    var myProducts = searchProductByIdUser(connectedUserId, products);
    var productList = '';
    for (let i = 0; i < myProducts.length; i++) {
        productList += `
            <div class="col-lg-3 col-md-6">
                <div class="single-product">
                    <img class="img-fluid" src="img/product/p1.jpg" alt="">
                    <div class="product-details">
                        <h6>${myProducts[i].nameProduct}</h6>
                        <div class="price">
                            <h6>${myProducts[i].priceProduct}</h6>
                            <h6 class="l-through">$210.00</h6>
                        </div>
                        <h6>${myProducts[i].categoryProduct}</h6>
                        <div class="prd-bottom">
                            <div href="" class="social-info">
                                <span class="ti-bag"></span>
                                <button class="btn btn-hover hover-text" onclick="goToDisplayProduct(${myProducts[i].id})">Display</button>
                            </div>
                            <div href="" class="social-info">
                                <span class="ti-bag"></span>
                                <button class="btn btn-hover hover-text" onclick="deleteObject(${getObjectPositionById(myProducts[i].id, products)},'products')">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
    }
    document.getElementById('productList').innerHTML = productList;
}

function searchProductByIdUser(userId, productTab) {
    var myproduct = [];
    for (let i = 0; i < productTab.length; i++) {
        if (userId == productTab[i].idUser && productTab[i].isConfirmed == true) {
            myproduct.push(productTab[i]);
        }
    }
    return myproduct;
}

//bech nekhou l produit ml id mtee l produit selectionnée
function searchProductById(productId, productTab) {
    var productDetail;
    for (let i = 0; i < productTab.length; i++) {
        if (productId == productTab[i].id) {
            productDetail = productTab[i];
            break;
        }
    }
    return productDetail;
}

//bech tkhabi l id mtee l produit selectionnée fl LS 
function goToDisplayProduct(idPro) {
    localStorage.setItem('selectedIdProduct', idPro);
    location.replace('display-product.html');
}
//t'affichilek l page display-product suivant le role de user 
function displayProductInfoByUserRole() {
    var idSelectedProduct = localStorage.getItem('selectedIdProduct');
    var products = getObjectFromLS('products');
    var product = searchProductById(idSelectedProduct, products);
    var productDetail = "";
    var connectedUserID = getConnectedUserFromLS();
    var findedUser = searchUserById(connectedUserID);
    if (connectedUserID) {
        if (findedUser.role == "admin-user") {//admin
            productDetail += `
            <div class="col offset-lg-1" id="productInfo">
                <div class="s_product_text" style="margin-top: 0px ">
                    <h3>${product.nameProduct}</h3>
                    <h2>$${product.priceProduct}</h2>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item"><span class="font-weight-bold">Category</span> : ${product.categoryProduct}</li>`;
            if (product.stockProduct > 0) {
                productDetail += `<li class="list-group-item text-success"><span class="font-weight-bold">Availibility</span> : In Stock</li>`;
            } else {
                productDetail += `<li class="list-group-item text-danger"><span class="font-weight-bold">Availibility</span> : unavailable</li>`;
            }
            productDetail += `
                        
                        <li class="list-group-item"><span class="font-weight-bold">stock</span> : ${product.stockProduct}</li>
                    </ul>
                    <div class="card_area d-flex align-items-center mt-3">
                        <button class="primary-btn border-0 rounded-0" href="#" onclick="editProductDetails()">Edit Product</button>
                        <a class="icon_btn" href="#"><i class="lnr lnr lnr-diamond"></i></a>
                        <a class="icon_btn" href="#"><i class="lnr lnr lnr-heart"></i></a>
                    </div>
                </div>
                <div class="mt-3" id="editProduct"></div>
            </div>
        `;
        } else {//simple user
            productDetail += `
            <div class="col offset-lg-1" id="productInfo">
                <div class="s_product_text" style="margin-top: 0px ">
                    <h3>${product.nameProduct}</h3>
                    <h2>$${product.priceProduct}</h2>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item"><span class="font-weight-bold">Category</span> : ${product.categoryProduct}</li>`;
            if (product.stockProduct > 0) {
                productDetail += `<li class="list-group-item text-success"><span class="font-weight-bold">Availibility</span> : In Stock</li>`;
            } else {
                productDetail += `<li class="list-group-item text-danger"><span class="font-weight-bold">Availibility</span> : unavailable</li>`;
            }
            productDetail += `
                        <li class="list-group-item"><span class="font-weight-bold">stock</span> : ${product.stockProduct}</li>
                    </ul>
                </div><br>
                <div class="col-md-12 form-group">
                <div class="row">
                <div class="col-3"><h6>Quantity</h6 ></div>
                <div class="col-9"><input type="number" class="form-control col-3 ms-5" id="qteValue"></div><br>       
                <div class="text-center"><button class="btn btn-success" style=" left: 200px; position:absolute" onclick="reserveProduct()">Reserve</button></div>   
                </div>
                </div>
                <span id="indisponibiliteErrorMsg"></span>
            </div>
        `;
        }
    } else {
        productDetail += `
        <div class="col offset-lg-1" id="productInfo">
            <div class="s_product_text" style="margin-top: 0px ">
                <h3>${product.nameProduct}</h3>
                <h2>$${product.priceProduct}</h2>
                <ul class="list-group list-group-flush">
                            <li class="list-group-item"><span class="font-weight-bold">Category</span> : ${product.categoryProduct}</li>`;
        if (product.stockProduct > 0) {
            productDetail += `<li class="list-group-item text-success"><span class="font-weight-bold">Availibility</span> : In Stock</li>`;
        } else {
            productDetail += `<li class="list-group-item text-danger"><span class="font-weight-bold">Availibility</span> : unavailable</li>`;
        }
        productDetail += `
                    <li class="list-group-item"><span class="font-weight-bold">stock</span> : ${product.stockProduct}</li>
                </ul>
            </div>
        </div>
    `;
    }


    document.getElementById('ProductDetails').innerHTML = productDetail;
}
//ki bech tenzel ala EDIT PRODUCT bech y'affichilek block bech tbadel les valeurs mtee l inputs fl LS (puisque enti admin)
function editProductDetails() {
    var idSelectedProduct = localStorage.getItem('selectedIdProduct');
    var products = getObjectFromLS('products');
    var product = searchProductById(idSelectedProduct, products);
    var editProduct = "";
    editProduct +=
        `
        <div class="login_form_inner" style="padding-top: 20px ;box-shadow:none; ">
            <h3>Edit product</h3>
            <div class="row login_form">
                <div class="col-md-12 form-group">
                    <h6 class="float-left">Name product</h6 >
                    <input type="text" class="form-control" id="editNameProduct">
                </div>
                <div class="col-md-12 form-group">
                    <h6 class="float-left">Price product</h6 >
                    <input type="text" class="form-control" id="editPriceProduct">
                </div>
                <div class="col-md-12 form-group">
                    <h6 class="float-left">Stock product</h6 >
                    <input type="text" class="form-control" id="editStockProduct">
                </div>
                <div class="col-md-12 form-group">
                    <button type="submit" value="submit" class="primary-btn" onclick="validateEdit()">Validate edit product</button>
                </div>
            </div>
        </div>  
    `;
    document.getElementById('editProduct').innerHTML = editProduct;
    document.getElementById('editNameProduct').value = product.nameProduct;
    document.getElementById('editPriceProduct').value = product.priceProduct;
    document.getElementById('editStockProduct').value = product.stockProduct;
}

function validateEdit() {
    newNameProduct = document.getElementById('editNameProduct').value;
    newPriceProduct = document.getElementById('editPriceProduct').value;
    newStockProduct = document.getElementById('editStockProduct').value;
    var idSelectedProduct = localStorage.getItem('selectedIdProduct');
    var products = getObjectFromLS('products');
    for (let i = 0; i < products.length; i++) {
        if (products[i].id == idSelectedProduct) {
            products[i].nameProduct = newNameProduct;
            products[i].priceProduct = newPriceProduct;
            products[i].stockProduct = newStockProduct;
            break;
        }
    }
    localStorage.setItem('products', JSON.stringify(products));
    location.replace('products.html');
}

function deleteProduct(position) {
    var products = getObjectFromLS('products');
    products.splice(position, 1);
    localStorage.setItem('products', JSON.stringify(products));
    location.reload();
}
//fonction generic delete
function deleteObject(position, key) {
    var objects = getObjectFromLS(key);
    objects.splice(position, 1);
    localStorage.setItem(key, JSON.stringify(objects));
    location.reload();
}

function displayProducts() {
    var products = getObjectFromLS('products');
    var listProducts = "";
    for (let i = 0; i < products.length; i++) {
        listProducts += `<tr>
                    <td>${products[i].nameProduct}</td>
                    <td>${products[i].priceProduct}</td>
                    <td>${products[i].stockProduct}</td>
                    <td>${products[i].categoryProduct}</td>
                    <td>
                    <button class="btn btn-danger" onclick="deleteProduct(${i})">delete</button>`;
        //confirmation des produits par le super admin//
        if (products[i].isConfirmed == false) {
            listProducts += `<button class="btn btn-success" onclick="confirmCommand(${products[i].id})">confirm</button>`;
        }
        listProducts += `</td>
                </tr>`;
    }
    document.getElementById('listProducts').innerHTML = listProducts;
}

function displayUsers() {
    var users = getObjectFromLS('users');
    var listUsers = "";
    for (let i = 0; i < users.length; i++) {
        listUsers += `<tr>
                    <td>${users[i].firstName}</td>
                    <td>${users[i].lastName}</td>
                    <td>${users[i].email}</td>
                    <td>${users[i].phone}</td>
                    <td>${users[i].role}</td>
                    <td>
                    <button class="btn btn-danger">delete</button>
                    </td>

                </tr>`;
    }
    document.getElementById('listUsers').innerHTML = listUsers;
}

function confirmCommand(id) {
    var products = getObjectFromLS('products');
    for (let i = 0; i < products.length; i++) {
        if (id == products[i].id) {
            products[i].isConfirmed = true;
            break;
        }
    }
    localStorage.setItem('products', JSON.stringify(products));
    location.reload();
}

function displayAllProduct() {
    var products = getObjectFromLS('products');
    var productList = "";
    var confirmedProduct = [];
    for (let i = 0; i < products.length; i++) {
        if (products[i].isConfirmed == true) {
            confirmedProduct.push(products[i]);
        }
    }
    for (let i = 0; i < confirmedProduct.length; i++) {
        productList += `
    <div class="single-product col-4">
        <img class="img-fluid" src="img/product/p1.jpg" alt="">
        <div class="product-details">
            <h6>${products[i].nameProduct}</h6> 
            <div class="price">
                <h6>$${products[i].priceProduct}</h6>
                <h6 class="l-through">$210.00</h6>
            </div>
            <div class="prd-bottom">
                <div href="" class="social-info">
                    <span class="ti-bag"></span>
                    <button class="btn btn-hover hover-text" onclick="goToDisplayProduct(${products[i].id})">Display</button>
                </div>
                <div href="" class="social-info">
                    <span class="lnr lnr-heart"></span>
                    <button class="btn btn-hover hover-text" onclick="addToWishlist(${products[i].id})">Wishlist</button>
                </div>
            </div>
        </div>
    </div>`;
    }

    document.getElementById('allProduct').innerHTML = productList;
}

function addToWishlist(idPro) {
    location.replace("wishlist.html");
    var idWishlist = JSON.parse(localStorage.getItem('idWishlistkey') || '1');
    var connectedUserId = getConnectedUserFromLS();
    var wishlistObj = {
        id: idWishlist,
        idProduct: idPro,
        idUser: connectedUserId
    };
    var wishlistTab = JSON.parse(localStorage.getItem('wishlist') || '[]');
    wishlistTab.push(wishlistObj);
    localStorage.setItem('wishlist', JSON.stringify(wishlistTab));
    localStorage.setItem('idWishlistkey', idWishlist + 1);
}

function getWishlistByUserId(id) {
    var wishlistTab = getObjectFromLS('wishlist');
    var myWishlist = [];
    for (let i = 0; i < wishlistTab.length; i++) {
        if (wishlistTab[i].idUser == id) {
            myWishlist.push(wishlistTab[i]);
        }
    }
    return myWishlist;
}

function displayWishlist() {
    var connectedUserId = getConnectedUserFromLS();
    var wishlistTab = getObjectFromLS('wishlist');
    var myWishlist = getWishlistByUserId(connectedUserId);
    //console.log("my wishlist",myWishlist); 
    var wishlistTable = "";
    var products = getObjectFromLS('products');
    //console.log("mon produits favoris",product); 
    if (myWishlist.length == 0) {
        wishlistTable += `
            <div class="row justify-content-center">
                <div class="col-lg-6 text-center">
                    <div class="section-title">
                        <h1>Aucun product in your wishlist</h1>
                    </div>
                </div>
            </div>`;
    } else {
        wishlistTable += `
        <div class="row justify-content-center">
            <div class="col-lg-6 text-center">
                <div class="section-title">
                    <h1>Product wishlist</h1>
                </div>
            </div>
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">name product</th>
                    <th scope="col">price</th>
                    <th scope="col">stock</th>
                    <th scope="col">category</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>`;
        for (let i = 0; i < myWishlist.length; i++) {
            var product = searchProductById(myWishlist[i].idProduct, products);
            wishlistTable += `
            <tr>
            <td>${product.nameProduct}</td>
            <td>${product.priceProduct}</td>
            <td>${product.stockProduct}</td>
            <td>${product.categoryProduct}</td>
            <td><button class="btn btn-danger" onclick="deleteObject(${getObjectPositionById(myWishlist[i].id, wishlistTab)},'wishlist')">delete</button></td>
            </tr>`;
        }
        wishlistTable += `
            </tbody>
        </table>`;
    }

    //console.log("position de l'id",getObjectPositionById(myWishlist[i].id,wishlistTab));

    document.getElementById('wishlist').innerHTML = wishlistTable;

}

function searchUserById(id) {
    var findedUser;
    var users = getObjectFromLS('users');
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == id) {
            findedUser = users[i]; break;
        }
    }
    return findedUser;
}

function reserveProduct() {
    var qteValue = document.getElementById('qteValue').value;
    var idSelectedProduct = localStorage.getItem('selectedIdProduct');
    var products = getObjectFromLS('products');
    var product = searchProductById(idSelectedProduct, products);
    var connectedUser = getConnectedUserFromLS();
    if (qteValue <= product.stockProduct) {
        var idOrder = JSON.parse(localStorage.getItem('idOrder') || '1');
        var order = {
            id: idOrder,
            qte: qteValue,
            idUser: connectedUser,
            idProduct: idSelectedProduct,
            status: false
        }
        //ajouter un order a un tab d'orders
        var orders = JSON.parse(localStorage.getItem('orders') || '[]');
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));
        //increment idOrder
        localStorage.setItem('idOrder', idOrder + 1);
        //update stock from LS
        var newStockValue = product.stockProduct - qteValue;
        updateQteValue(idSelectedProduct, newStockValue);
        location.replace('basket.html');
    } else {
        document.getElementById('indisponibiliteErrorMsg').innerHTML = "Stock indisponible!";
        document.getElementById('indisponibiliteErrorMsg').style.color = "red";
    }
}

function updateQteValue(idProduct, newValue) {
    var products = getObjectFromLS('products');
    for (let i = 0; i < products.length; i++) {
        if (idProduct == products[i].id) {
            products[i].stockProduct = newValue; break;
        }
    }
    localStorage.setItem('products', JSON.stringify(products));
}

function getOrdersByUserId(id) {
    var orders = getObjectFromLS('orders');
    var myOrders = [];
    for (let i = 0; i < orders.length; i++) {
        if (orders[i].idUser == id) {
            myOrders.push(orders[i]);
        }
    }
    return myOrders;
}

function deleteObjectAndUpdateProduct(position, key, idProduct, qte) {
    var objects = getObjectFromLS(key);
    objects.splice(position, 1);
    localStorage.setItem(key, JSON.stringify(objects));
    //update product stock
    var products = getObjectFromLS('products');
    for (let i = 0; i < products.length; i++) {
        if (products[i].id == idProduct) {
            products[i].stockProduct += Number(qte);
            break;
        }
    }
    localStorage.setItem('products', JSON.stringify(products));
    location.reload();
}

function displayBasket() {
    var connectedUserID = getConnectedUserFromLS();
    var products = getObjectFromLS('products');
    var orders = getObjectFromLS('orders');
    var myOrders = getOrdersByUserId(connectedUserID);
    var basket = "";
    if (myOrders.length == 0) {
        basket += "<h1>No reserved product<h1>";
    } else {

        basket += `   
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Product</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Total</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                    <tbody>`;
        var total = 0;
        for (let i = 0; i < myOrders.length; i++) {
            var order = myOrders[i];
            var product = searchProductById(myOrders[i].idProduct, products);
            total += product.priceProduct * order.qte;
            basket += ` 
                <tr>
                    <td>
                        <div class="media">
                            <div class="d-flex">
                                <img src="img/cart.jpg" alt="">
                            </div>
                            <div class="media-body">
                                <h6>${product.nameProduct}</h6>
                            </div>
                        </div>
                    </td>
                    <td>
                        <h5 id="unitPrice">$${product.priceProduct}</h5>
                    </td>
                    <td>
                        <h5 id="quantiteOrder">${order.qte}</h5>
                    </td>
                    <td>
                        <h5 id="totalPrice">$${product.priceProduct * order.qte}</h5>
                    </td>
                        <td>`;
            if (order.status == true) {
                basket += `<p>your order is confirmed</p>`;
            } else {
                basket += `
                            <button class="btn btn-danger" onclick="deleteObjectAndUpdateProduct(${getObjectPositionById(order.id, orders)},'orders',${product.id},${order.qte})">Delete</button>
                            `;
            }

            basket += `</td>
                </tr>`;
        }
        basket += `
                <tr class="shipping_area">
                    <td>

                    </td>
                    <td>

                    </td>
                    <td>
                        <h5>SubTotal</h5>
                    </td>
                    <td>
                        <h5>$${total}</h5>
                    </td>
                </tr>
                <tr class="shipping_area">
                    <td>

                    </td>
                    <td>

                    </td>
                    <td>
                        <h5>Shipping</h5>
                    </td>
                    <td>
                        <div class="shipping_box">
                            <ul class="list">${ShippingPrice(total)}</ul>
                        
                        </div>
                    </td>
                </tr>
                <tr class="out_button_area">
                    <td>

                    </td>
                    <td>

                    </td>
                    <td>

                    </td>
                    <td>
                        <div class="checkout_btn_inner d-flex align-items-center">
                            <a class="primary-btn" href="#">Proceed to checkout</a>
                        </div>
                    </td>
                </tr>
                    </tbody>
            </table>
        
`;
    }
    document.getElementById('basket').innerHTML = basket;
}

//function that get order position by id
function getObjectPositionById(id, tab) {
    var pos;
    for (let i = 0; i < tab.length; i++) {
        if (tab[i].id == id) {
            pos = i; break;
        }
    }
    return pos;
}

function ShippingPrice(price) {
    // if (price>=300) {
    //     return "free"; 
    // } else {
    //     return "7$"; 
    // }
    return (price >= 300) ? "free" : "7$";
}
/*test vendredi*/
function searchUserById(id) {
    var userInfo
    var users = getObjectFromLS('users');
    for (let i = 0; i < users.length; i++) {
        if (id == users[i].id) {
            userInfo = users[i];
        }
    }
    return userInfo
}

function displayProfileInfo() {
    var connectedUserId = getConnectedUserFromLS();
    var profileInfo = "";
    profileInfo += `<h5 class="pb-2">First name : ${searchUserById(connectedUserId).firstName}</h5>
    <h5 class="pb-2">Last name :  ${searchUserById(connectedUserId).lastName}</h5>
    <h5 class="pb-2">Email :  ${searchUserById(connectedUserId).email}</h5>
    <h5 class="pb-2">Tel :  ${searchUserById(connectedUserId).phone}</h5>
    <button class="btn  btn-warning mt-2 mb-5" onclick="displayEditProfile()">Edit</button> <br>
    <div id="editProfile"></div>
    `;

    document.getElementById('profileInfo').innerHTML = profileInfo;
}

function displayEditProfile() {
    var connectedUserId = getConnectedUserFromLS();
    var editProfile = "";
    editProfile += `
    <div class="row">
        <div class="col">Email</div>
        <div class="col">
            <input id="emailEdit">
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col">Tel</div>
        <div class="col">
            <input id="telEdit">
        </div>
    </div>
    <button class="btn  btn-success mt-4" onclick="updateProfile()">Validate</button> 
    `;
    document.getElementById('editProfile').innerHTML = editProfile;
    document.getElementById('emailEdit').value = searchUserById(connectedUserId).email;
    document.getElementById('telEdit').value = searchUserById(connectedUserId).phone;
}
//checkEmailExist(email)&& emailformat
function updateProfile() {
    var connectedUserId = getConnectedUserFromLS();
    var users = getObjectFromLS('users');
    var newEmailValue = document.getElementById('emailEdit').value;
    var newTelValue = document.getElementById('telEdit').value;
    var isEmailUnique = !checkEmailExist(newEmailValue); //email not exist
    var isFromatEmailValid = checkFormatEmail(newEmailValue);
    for (let i = 0; i < users.length; i++) {
        if (connectedUserId == users[i].id && isEmailUnique && isFromatEmailValid) {
            users[i].email = newEmailValue;
            users[i].phone = newTelValue;
            break;
        }
    }
    localStorage.setItem('users', JSON.stringify(users));
    location.reload();
}
//bech tthahar l header dynamiquement 
function displayHeader() {
    var connectedUserId = getConnectedUserFromLS();
    var user = searchUserById(connectedUserId);
    var header = "";
    header += `<div class="main_menu">
    <nav class="navbar navbar-expand-lg navbar-light main_box">
        <div class="container">
            <!-- Brand and toggle get grouped for better mobile display -->
            <a class="navbar-brand logo_h" href="index.html"><img src="img/logo.png" alt=""></a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
             aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <!-- Collect the nav links, forms, and other content for toggling -->
            `;
    if (!connectedUserId) {//user not exist // user not connected
        header += `<div class="collapse navbar-collapse offset" id="navbarSupportedContent">
                <ul class="nav navbar-nav menu_nav ml-auto">
                    <li class="nav-item active"><a class="nav-link" href="index.html">Home</a></li>
                    <li class="nav-item submenu dropdown">
                        <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                         aria-expanded="false">Shop</a>
                        <ul class="dropdown-menu">
                            <li class="nav-item"><a class="nav-link" href="category.html">Shop Category</a></li>
                            <li class="nav-item"><a class="nav-link" href="single-product.html">Product Details</a></li>
                            <li class="nav-item"><a class="nav-link" href="checkout.html">Product Checkout</a></li>
                            <li class="nav-item"><a class="nav-link" href="cart.html">Shopping Cart</a></li>
                            <li class="nav-item"><a class="nav-link" href="confirmation.html">Confirmation</a></li>
                        </ul>
                    </li>
                    <li class="nav-item submenu dropdown">
                        <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                         aria-expanded="false">Blog</a>
                        <ul class="dropdown-menu">
                            <li class="nav-item"><a class="nav-link" href="blog.html">Blog</a></li>
                            <li class="nav-item"><a class="nav-link" href="single-blog.html">Blog Details</a></li>
                        </ul>
                    </li>
                    <li class="nav-item"><a class="nav-link" href="contact.html">Contact</a></li>
                    <li class="nav-item"><a class="nav-link" href="login.html">Login</a></li>
                    <li class="nav-item submenu dropdown">
                        <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                         aria-expanded="false">Signup</a>
                        <ul class="dropdown-menu">
                            <li class="nav-item"><a class="nav-link" href="custumer-signup.html">simple user</a></li>
                            <li class="nav-item"><a class="nav-link" href="store-signup.html">admin user</a></li>
                        </ul>
                    </li>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                    <li class="nav-item"><a href="#" class="cart"><span class="ti-bag"></span></a></li>
                    <li class="nav-item">
                        <button class="search"><span class="lnr lnr-magnifier" id="search"></span></button>
                    </li>
                </ul>
                    </div>`;
    } else {
        if (user.role == "simple-user") {//simple user
            var myOrders = getOrdersByUserId(connectedUserId);
            var myWishlist = getWishlistByUserId(connectedUserId);
            var myOrdersLength = myOrders.length;
            var myWishlistLength = myWishlist.length;
            header += `
            <ul class="nav navbar-nav menu_nav ml-auto">
                <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
                <li class="nav-item"><a class="nav-link" href="shop.html">Shop</a></li>
                <li class="nav-item"><a class="nav-link notification" href="basket.html">
                Basket<span class="badge">${myOrdersLength}</span>
                </a></li>
                <li class="nav-item"><a class="nav-link notification" href="wishlist.html">
                Wishlist<span class="badge">${myWishlistLength}</span>
                </a></li>
                <li class="nav-item"><a class="nav-link" href="profile.html">welcome ${user.firstName}</a></li>
                <li class="nav-item"><a class="nav-link" href="search.html">Search</a></li>
                <li class="nav-item">
					<button class="search pt-2" style="background-color: transparent; border-width: 0px;"><span class="lnr lnr-magnifier" id="search"></span></button>
				</li>
                <li class="nav-item"><a class="nav-link" onclick="logout()">Logout</a></li>
            </ul>`;
        } else {// admin 
            var myOrdersNotConfirm = getOrdersAdminNotConfirm();
            var myOrdersLength = myOrdersNotConfirm.length;
            header += `
            <ul class="nav navbar-nav menu_nav ml-auto">
                <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
                <li class="nav-item submenu dropdown">
                        <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                         aria-expanded="false">Products</a>
                        <ul class="dropdown-menu">
                            <li class="nav-item"><a class="nav-link" href="products.html">products list</a></li>
                            <li class="nav-item"><a class="nav-link" href="add-product.html">Add products</a></li>
                            <li class="nav-item"><a class="nav-link" href="add-categories.html">Add categorie</a></li>
                        </ul>
                    </li>
                <li class="nav-item"><a class="nav-link notification" href="store-orders.html">
                Orders<span class="badge">${myOrdersLength}</span>
                </a></li>
                <li class="nav-item"><a class="nav-link" href="profile.html">welcome ${user.firstName}</a></li>
                <li class="nav-item"><a class="nav-link" href="search.html">Search</a></li>
                <li class="nav-item"><a class="nav-link" onclick="logout()">Logout</a></li>
            </ul>`;
        }
    }
    header += ` </div>
    </nav>
</div>
<div class="search_input" id="search_input_box">
    <div class="container">
        <form class="d-flex justify-content-between">
            <input type="text" class="form-control" id="search_input" placeholder="Search Here">
            <button type="submit" class="btn"></button>
            <span class="lnr lnr-cross" id="close_search" title="Close Search"></span>
        </form>
    </div>
                </div>`;
    document.getElementById('header').innerHTML = header;
}

function logout() {
    localStorage.removeItem('connectedUserId');
    location.replace("index.html");
}
//faire une recherche avec product name or categorie 
function searchProduct() {
    var products = getObjectFromLS('products');
    var searchNameProduct = document.getElementById('searchNameProduct').value;
    //var searchCategoryProduct = document.getElementById('searchCategoryProduct').value;
    var searchedProduct = "";
    var count = 0;
    //console.log(searchNameProduct,searchCategoryProduct)
    for (let i = 0; i < products.length; i++) {
        //|| searchCategoryProduct == products[i].categoryProduct
        if ((searchNameProduct.toLowerCase() == (products[i].nameProduct).toLowerCase()) && products[i].isConfirmed == true) {
            count++;
            searchedProduct += `
            <div class="col-4">
                <div class="single-product">
                    <img class="img-fluid" src="img/product/p1.jpg" alt="">
                    <div class="product-details">
                        <h6>${products[i].nameProduct}</h6> 
                        <div class="price">
                            <h6>$${products[i].priceProduct}</h6>
                            <h6 class="l-through">$210.00</h6>
                        </div>
                        <div class="prd-bottom">
                            <div href="" class="social-info">
                                <span class="ti-bag"></span>
                                <button class="btn btn-hover hover-text" onclick="goToDisplayProduct(${products[i].id})">Display</button>
                            </div>
                            <div href="" class="social-info">
                                <span class="ti-bag"></span>
                                <button class="btn btn-hover hover-text mb-5">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
        }
        if (count == 0) {
            document.getElementById('searchedProducts').innerHTML = `
            <div class="text-center pt-3">
            <h3>Not founded product</h3>
            </div>
            `;
        } else {
            document.getElementById('searchedProducts').innerHTML = searchedProduct;
        }


    }
}

function getOrdersAdmin() {
    var connectedUserId = getConnectedUserFromLS();
    var products = getObjectFromLS('products');
    var myProducts = searchProductByIdUser(connectedUserId, products);// les produits du connected user
    var orders = getObjectFromLS('orders');
    var myOrders = [];
    for (let j = 0; j < orders.length; j++) {
        for (let i = 0; i < myProducts.length; i++) {
            if (myProducts[i].id == orders[j].idProduct) {
                myOrders.push(orders[j]);
            }
        }
    }
    return myOrders;
}
function getOrdersAdminNotConfirm() {
    var myOrdersNotConfirm = [];
    var myOrders = getOrdersAdmin();
    for (let i = 0; i < myOrders.length; i++) {
        if (myOrders[i].status == false) {
            myOrdersNotConfirm.push(myOrders[i]);
        }
    }
    return myOrdersNotConfirm;
}

function displayOrders() {
    var products = getObjectFromLS('products');
    var myOrders = getOrdersAdmin();
    // console.log("my products", myProducts);
    // console.log("tous les orders", orders);
    // console.log("les ordres de mes produits", myOrders);
    var listOrders = "";
    for (let i = 0; i < myOrders.length; i++) {
        var product = searchProductById(myOrders[i].idProduct, products);
        var user = searchUserById(myOrders[i].idUser);
        listOrders += ` 
        <tr>
            <td>${product.nameProduct}</td>
            <td>${product.priceProduct}</td>
            <td>${myOrders[i].qte}</td>
            <td>${myOrders[i].qte * product.priceProduct}</td>
            <td>${numberFormat(myOrders[i].qte * product.priceProduct * 1.12)}</td>
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.phone}</td>
            <td>`;
        if (myOrders[i].status == false) {
            listOrders += ` 
                <button class="btn btn-info" onclick="confirmOrder(${myOrders[i].id})">confirm</button>
                `;
        } else {
            listOrders += ` 
                <p>this order is confirmed</p>
                `;
        }

        listOrders += `</td>
        </tr>`;
    }
    document.getElementById('listOrders').innerHTML = listOrders;
}

function numberFormat(num) {
    return (Math.round(num * 100) / 100).toFixed(2);
}

//bech naaml update ll attribut status ywali true ki n'clicki aal button
function confirmOrder(idOrder) {
    var orders = getObjectFromLS('orders');
    for (let i = 0; i < orders.length; i++) {
        if (orders[i].id == idOrder) {
            orders[i].status = true;
        }
    }
    localStorage.setItem('orders', JSON.stringify(orders));
    location.reload();
}

function displayProductManager() {
    var products = getObjectFromLS('products');
    var listProductManager = "";

    listProductManager += `
        <table>
                        <thead>
                            <th scope="col">name Product</th>
                            <th scope="col">stock Product</th>
                            <th scope="col">price Product</th>
                            <th scope="col">category Product</th>
                            <th scope="col">Selectionne</th>
                        </thead>
                        <tbody>`;
    for (let i = 0; i < products.length; i++) {
        listProductManager += `
                        <tr>
                        <td>${products[i].nameProduct}</td>
                        <td>${products[i].priceProduct}</td>
                        <td>${products[i].stockProduct}</td>
                        <td>${products[i].categoryProduct}</td>
                        <td><input type="checkbox" id="${products[i].id}" onclick="savePosition(this)" id="checkboxValue"></td>
            
            </tr>`;
    }
    //getObjectPositionById(i,products)
    listProductManager += `
                        </tbody>
                    </table>
                    
                    <button class="btn btn-danger" onclick="deleteAllChekedProducts()">delete</button>`;


    document.getElementById('listProductManager').innerHTML = listProductManager;


}
var checkedRow = [];
//insert les id des produits checked
function savePosition(element) {
    checkedRow.push(element.id);
    console.log("element", element.id);
}

function deleteAllChekedProducts() {
    console.log("checkedRow", checkedRow);
    var products = getObjectFromLS('products');
    for (let i = 0; i < checkedRow.length; i++) {
        products.splice(getObjectPositionById(checkedRow[i],products),1); 
    }
    localStorage.setItem('products',JSON.stringify(products)); 
    location.reload(); 
}
