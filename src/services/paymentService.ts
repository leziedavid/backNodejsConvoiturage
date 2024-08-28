import { v4 as uuidv4 } from 'uuid';

const WAVE_API_URL = 'https://api.wave.com/v1/checkout/sessions';
const WAVE_API_KEY = 'wave_ci_prod_BRoKc90NC_ioDJ-csqkMIvPOMzidfGwFhjS7YNtk6T4ucmxisg5UI-tDCRyBc4gFy4qsaeaVL318WHkWC17Hj1KLF3mUeN3dxw';

interface LaunchPaymentResponse {
    wave_launch_url: string;
    id: string;
}

interface PaymentStatusResponse {
    payment_status: string;
    last_payment_error?: string;
}

export const launchPayment = async (amount: number): Promise<{ wave_id: string; wavelaunchurl: URL }> => {
    try {
        const response = await fetch(WAVE_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${WAVE_API_KEY}`,
                'Content-Type': 'application/json',
                'idempotency-key': uuidv4(),
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

        const bodyResponses: LaunchPaymentResponse = await response.json();
        const { wave_launch_url, id } = bodyResponses;

        return { wave_id: id, wavelaunchurl: new URL(wave_launch_url) };
    } catch (error) {
        console.error('Error launching payment:', error);
        throw error; // Rethrow the error to be handled by the calling function
    }
};

export const requestToGetTransactionStatus = async (waveId: string): Promise<PaymentStatusResponse> => {
    try {
        const response = await fetch(`${WAVE_API_URL}${waveId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${WAVE_API_KEY}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const bodyResponses: PaymentStatusResponse = await response.json();
        return bodyResponses;
    } catch (error) {
        console.error('Error connecting to the server:', error);
        throw error; // Rethrow the error to be handled by the calling function
    }
};
