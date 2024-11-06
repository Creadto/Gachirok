import {Bootpay} from "@bootpay/client-js";

interface paymentData{
    price : number;
    orderName : string;
    userId: string;
}


export default function BootPayModule(props : paymentData) {


    const {price : price, orderName: orderName, userId: userId} = props;

    const handlePayment = async()=>{
         await Bootpay.requestPayment({
            "application_id": "67297d983aa7c4faf96e4ef3",
            "price": price,
            "order_name": orderName,
            "order_id": `${userId}-${Date.now().toString()}`,
            "pg": "나이스페이",
            "method": "카드",
            "tax_free": 0,
            "user": {
                "id": userId, // user pk
            },
            "items": [
                {
                    "id": "purchase_1vc",
                    "name": "1VC 충전",
                    "qty": 1,
                    "price": 1000
                },
                {
                    "id": "purchase_5vc",
                    "name": "5VC 충전",
                    "qty": 1,
                    "price": 5000
                },
                {
                    "id": "purchase_10vc",
                    "name": "10VC 충전",
                    "qty": 1,
                    "price": 10000
                },
                {
                    "id": "purchase_30vc",
                    "name": "30VC 충전",
                    "qty": 1,
                    "price": 30000
                },
                {
                    "id": "purchase_50vc",
                    "name": "50VC 충전",
                    "qty": 1,
                    "price": 50000
                },
                {
                    "id": "purchase_100vc",
                    "name": "100VC 충전",
                    "qty": 1,
                    "price": 100000
                },
            ],
            "extra": {
                "open_type": "iframe",
                "escrow": false
            }
        });
    }

    handlePayment();
}