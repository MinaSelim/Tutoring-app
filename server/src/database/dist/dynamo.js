"use strict";
exports.__esModule = true;
var aws_sdk_1 = require("aws-sdk");
/**
 * The singleton class that manages the dynamo db API
 */
var Dynamo = /** @class */ (function () {
    /**
     * The Singleton's constructor.
     */
    function Dynamo() {
        aws_sdk_1["default"].config.update({ region: 'local' });
    }
    /**
     * Function that returns the instance of the database to use.
     * @returns An instance of the dynamo DB api.
     */
    Dynamo.getInstance = function () {
        if (!Dynamo.instance) {
            Dynamo.instance = new aws_sdk_1["default"].DynamoDB({ apiVersion: '2012-08-10', endpoint: 'http://localhost:8000' });
        }
        return Dynamo.instance;
    };
    return Dynamo;
}());
exports["default"] = Dynamo;
