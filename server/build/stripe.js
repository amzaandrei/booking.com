"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var stripe = require('stripe')('sk_test_qrSVt2H4ov5KnvoSD6toZDpA');

function postCharge(_x, _x2) {
  return _postCharge.apply(this, arguments);
}

function _postCharge() {
  _postCharge = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(req, res) {
    var _req$body, amount, source, receipt_email, charge;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$body = req.body, amount = _req$body.amount, source = _req$body.source, receipt_email = _req$body.receipt_email;
            console.log(req);
            _context.next = 5;
            return stripe.charges.create({
              amount: amount,
              currency: 'RON',
              source: source,
              receipt_email: receipt_email
            });

          case 5:
            charge = _context.sent;

            if (charge) {
              _context.next = 8;
              break;
            }

            throw new Error('charge unsuccessful');

          case 8:
            res.status(200).json({
              message: 'charge posted successfully',
              charge: charge
            });
            _context.next = 14;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](0);
            res.status(500).json({
              message: _context.t0.message
            });

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 11]]);
  }));
  return _postCharge.apply(this, arguments);
}

module.exports = postCharge;