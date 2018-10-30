// business logic - - - - - DataBase logic - - - - - - -
function DataBase() {
  this.accounts = [],
  this.currentId = -1
}

DataBase.prototype.findAccountName = function(maybeAccount) {
  var newName = maybeAccount.name;
  for (var i = 0; i < this.accounts.length; i++) {
    if (this.accounts[i].name === newName) {
      console.log("found matching name")
      return true;
    }
  }
  console.log("found no matching name")
  return false;

}

DataBase.prototype.initializeAccount = function(account) {
  var matchFind = this.findAccountName(account);
  if (matchFind) {
    console.log("that account already exists")
  } else {
    console.log(account.name + " has been added to the data base")
    account.id = this.assignId();
    this.accounts.push(account);
    console.log("your id is: " + account.id);
  }
}

DataBase.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

// business logic - - - - - - Account logic - - - - - - - - - - - -
function Account(accountHolder, accountPassword, initialDeposit) {
  this.name = accountHolder,
  this.password = accountPassword,
  this.balance = parseInt(initialDeposit)
}

Account.prototype.deposit = function(depositAmount) {
  this.balance += depositAmount;
}

Account.prototype.withdrawal = function(withdrawalAmount) {
  newAmount = this.balance;
  newAmount -= withdrawalAmount;
  if (newAmount < 0) {
    console.log("$" + newAmount + " ...You might wanna reconsider that");
    return this.balance;
  } else {
    // return newAmount;
    this.balance = newAmount;
    return this.balance;
  }
}

var ourDatabase = new DataBase();
// var newAccount = new Account("Michael", "1234321", "150");
//
// ourDatabase.initializeAccount(newAccount);

// UI logic - - - - - - - - - - - - - - - - - - - - - - - - - - - -

$(document).ready(function() {
  $("form").submit(function(event) {
    event.preventDefault();
    var inputName = $("#inputName").val();
    var inputPassword = $("#inputPassword").val();
    var inputDeposit = $("#initialDeposit").val();

    var newAccount = new Account(inputName, inputPassword, inputDeposit);

    ourDatabase.initializeAccount(newAccount);
  });
});
