const readLine = require("readline");
const BankManager = require("./callback_logic");
const Account = require("./account_logic");

const rl = readLine.createInterface({
    input:process.stdin,
    output:process.stdout
})

var bank;

function getCommand() {
    rl.question("Command list:\nGL - get list,\nGET - get account by id,\nT- transfer from one to another account\nInsert command: ", (answear) => {
        if(answear.toLowerCase()==="gl") {
            bank.getList(getListCallback);
        }
        else if(answear.toLowerCase()==="get") {
            rl.question("Input account id: ", (answear) => {
                if(Number(answear)){
                    bank.get(answear, getCallback);
                }
            })
        }
        else if(answear.toLowerCase()==="t") {
            let from, to, money;
            rl.question("Input first id: ", (firstId) => {
                if(Number(firstId)) {
                    from = firstId; 
                    rl.question("Input second id: ", (secondId) => {
                        if(Number(secondId)) {
                            to = secondId; 
                            rl.question("Input transacton money amount: ", (moneyAmount) => {
                                if(Number(moneyAmount)) {
                                    money = Number(moneyAmount); 
                                    bank.transfer(from, to, money, transferCallback);
                                }
                                else {
                                    getCommand();
                                }
                            })
                        }
                        else {
                            getCommand();
                        }
                    });
                }
                else {
                    getCommand();
                }
            })
        }
        else {
            console.log("Invalid command");
            getCommand();
        }
    });
}

function getListCallback(error, info) {
    if(error) {
        console.log(info);
    }
    else {
        console.log(error);
    }
    getCommand();
}

function getCallback(error, info) {
    if(error) {
        let result = "";
        result+="---------------------------------\n";
        result+= "id:"+info.id+" money:"+info.money+" owner:"+info.owner.ownerName+" "+info.owner.ownerSurname+"\n";
        result+="---------------------------------\n";
        console.log(result);
    }
    else {
        console.log(error);
    }
    getCommand();
}

function transferCallback(error, info) {
    if(error) {
        let result = "";
        result+="---------------------------------\n";
        result+= "account with id:"+info.from+" transfers to account with id:"+info.to+" "+info.moneyAmount+" ghriven\n";
        result+="---------------------------------\n";
        console.log(result);
    }
    else {
        console.log(error);
    }
    getCommand();
}

function start() {
    bank = new BankManager([ new Account(1, 250, "Alexey", "Petrenko"), new Account(2, 80000, "Anatoliy", "Vaserman"), new Account(3, 2500, "Grigoriy", "Skovoroda"), new Account(4, 80, "Sjul", "Vern")]);
    getCommand();
}

start();
