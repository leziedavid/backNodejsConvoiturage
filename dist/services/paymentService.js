"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestToGetTransactionStatus = exports.launchPayment = void 0;
const uuid_1 = require("uuid");
const WAVE_API_URL = 'https://api.wave.com/v1/checkout/sessions';
const WAVE_API_KEY = 'wave_ci_prod_BRoKc90NC_ioDJ-csqkMIvPOMzidfGwFhjS7YNtk6T4ucmxisg5UI-tDCRyBc4gFy4qsaeaVL318WHkWC17Hj1KLF3mUeN3dxw';
const launchPayment = (amount) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(WAVE_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${WAVE_API_KEY}`,
                'Content-Type': 'application/json',
                'idempotency-key': (0, uuid_1.v4)(),
            },
            body: JSON.stringify({
                amount,
                currency: 'XOF',
                error_url: 'https://vavavoom.ci/error',
                success_url: 'https://vavavoom.ci/infos',
            }),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const bodyResponses = yield response.json();
        const { wave_launch_url, id } = bodyResponses;
        return { wave_id: id, wavelaunchurl: new URL(wave_launch_url) };
    }
    catch (error) {
        console.error('Error launching payment:', error);
        throw error; // Rethrow the error to be handled by the calling function
    }
});
exports.launchPayment = launchPayment;
const requestToGetTransactionStatus = (waveId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`${WAVE_API_URL}${waveId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${WAVE_API_KEY}`,
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const bodyResponses = yield response.json();
        return bodyResponses;
    }
    catch (error) {
        console.error('Error connecting to the server:', error);
        throw error; // Rethrow the error to be handled by the calling function
    }
});
exports.requestToGetTransactionStatus = requestToGetTransactionStatus;
//# sourceMappingURL=paymentService.js.map