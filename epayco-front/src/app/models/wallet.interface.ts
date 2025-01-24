export class Wallet {
    id!: number;
    amount!: number;
    id_user!: number;
};

export class WalletCharge {
    dni?: string;
    phone?: string;
    amount?: string
}

export class ConfirmPayment {
    sessionId?: string;
    token?: string;
}