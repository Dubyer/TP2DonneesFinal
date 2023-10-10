import MathModel from "../models/maths.js";
import Repository from "../models/repository.js";
import Controller from "./Controller.js";

export default class MathsController extends Controller {
  constructor(HttpContext) {
    super(HttpContext, new Repository(new MathModel()));
  }
  base() {}

  // We get the help page ----------------------------------------
  help() {
    let helpPagePath = path.join(
      process.cwd(),
      wwwroot,
      "API-Help-Pages/API-Maths/Help.html"
    );
    this.HttpContext.response.HTML(fs.readFileSync(helpPagePath));
  }
  // We get the differents responses depending on the operators given ----------------------------------------
  get() {
    if (this.HttpContext.path.queryString == "?") this.help();
    else this.Proceed();
  }
  Proceed() {
    if (Object.keys(this.HttpContext.path.params).length == 1) {
      this.HttpContext.response.JSON({ error: "Invalid request" });
    }

    // We get the variables and paste them , and check if theyre capitalized at the same time

    let x = parseFloat(this.HttpContext.path.params["x"]);
    if (isNaN(x)) {
      x = parseFloat(this.HttpContext.path.params["X"]);
    }
    let y = parseFloat(this.HttpContext.path.params["y"]);
    if (isNaN(y)) {
      y = parseFloat(this.HttpContext.path.params["Y"]);
    }
    let op = this.HttpContext.path.params["op"];

    let n = parseFloat(this.HttpContext.path.params["n"]);

    //  We get the differents responses depending on the operators given ----------------------------------------

    // Summation op ----------------------------------
    if (op == " ") {
      this.HttpContext.response.JSON({ op: "+", x: x, y: y, value: x + y });
      // Soustraction op ----------------------------------
    } else if (op == "-") {
      this.HttpContext.response.JSON({ op: op, x: x, y: y, value: x - y });
      // Multiplication op ----------------------------------
    } else if (op == "*") {
      this.HttpContext.response.JSON({ op: op, x: x, y: y, value: x * y });
      // Divisions op ----------------------------------
    } else if (op == "/") {
      if (y == 0 && x == 0) {
        this.HttpContext.response.JSON({ op: op, x: x, y: y, value: "NaN" });
      } else if (y == 0) {
        this.HttpContext.response.JSON({
          op: op,
          x: x,
          y: y,
          value: "Infinity",
        });
      } else {
        this.HttpContext.response.JSON({ op: op, x: x, y: y, value: x / y });
      }
    }
    // Modulus op ----------------------------------
    if (op == "%") {
      if (y == 0) {
        this.HttpContext.response.JSON({ op: op, x: x, y: y, value: "NaN" });
      } else {
        this.HttpContext.response.JSON({ op: op, x: x, y: y, value: x % y });
      }
    }
    // Factoral op ----------------------------------
    if (op == "!") {
      if (n == 0) {
        this.HttpContext.response.JSON({
          op: op,
          n: n,
          error: "Impossible with 0",
        });
      } else if (n < 0) {
        this.HttpContext.response.JSON({
          op: op,
          n: n,
          error: "Number must be greater than 0",
        });
      } else if (!Number.isInteger(n)) {
        this.HttpContext.response.JSON({
          op: op,
          n: n,
          error: "The number can't have decimals",
        });
      } else {
        this.HttpContext.response.JSON({ op: op, n: n, value: factorial(n) });
      }
    }
    // IsPrime op ----------------------------------
    if (op == "p") {
      if (n == 0) {
        this.HttpContext.response.JSON({
          op: op,
          n: n,
          error: "Number must be greater than 0",
        });
      } else if (!Number.isInteger(n)) {
        this.HttpContext.response.JSON({
          op: op,
          n: n,
          error: "The number can't have decimals",
        });
      } else {
        this.HttpContext.response.JSON({ op: op, n: n, value: isPrime(n) });
      }
    }
    // Prime nth op ----------------------------------
    if (op == "np") {
      if (n == 0) {
        this.HttpContext.response.JSON({
          op: op,
          n: n,
          error: "Number must be greater than 0",
        });
      } else if (!Number.isInteger(n)) {
        this.HttpContext.response.JSON({
          op: op,
          n: n,
          error: "The number can't have decimals",
        });
      } else {
        this.HttpContext.response.JSON({ op: op, n: n, value: findPrime(n) });
      }
    }
  }
}
// Usefull functions already given-----------------------------------
function findPrime(n) {
  let primeNumer = 0;
  for (let i = 0; i < n; i++) {
    primeNumer++;
    while (!isPrime(primeNumer)) {
      primeNumer++;
    }
  }
  return primeNumer;
}
function factorial(n) {
  if (n == 0) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}
function isPrime(value) {
  for (var i = 2; i < value; i++) {
    if (value % i === 0) {
      return false;
    }
  }
  return value > 1;
}
