// react-email
import { Html, Head, Body, Container, Heading, Text, Row, Section } from '@react-email/components';


const PaymentEmail = ({ user, orderId, totalPrice, address }: { user: string; orderId: string, totalPrice: number, address: string }) => {
    return (
        <Html>
            <Head>
                <style>
                    {`
                        .payment-email {
                            position: relative;
                            background: #99ff4f;
                            width: 100%;
                            height: 100%;
                            padding: 30px;
                            border-radius: 12px;
                        }

                        .payment-email__title {
                            color: #fff;
                            font-size: 24px;
                        }

                        .payment-email__body {
                            display: flex;
                            flex-direction: column;
                            row-gap: 20px;
                            font-family: var(--font-raleway);
                            font-weight: 900;
                        }
                        .payment-email__order {
                            display: flex;
                            flex-direction: column;
                            row-gap: 20px;
                            font-family: var(--font-inter);
                            font-weight: 700;
                        }
                        .payment-email__order-info {
                            color: #fff;
                            font-family: var(--font-raleway);
                            font-weight: 900;
                        }

                        .payment-email__signature {
                            font-weight: var(--font-inter);
                            font-size: 14px;
                            font-weight: 700;
                        }
                    `}
                </style>
            </Head>
            <Body>
                <Container className="payment-email">
                        
                    <Heading className="payment-email__title">Привет, {user}!</Heading>

                    <Text className="payment-email__body">
                        Заказ {orderId} успешно оплачен и скоро будет передан в доставку:

                        <Section className="payment-email__order">
                            <Text className='payment-email__order-info'>Адрес: {address}</Text>
                            <Text className='payment-email__order-info'>Доставка: БЕСПЛАТНО</Text>
                            <Text className='payment-email__order-info'>Итого: {totalPrice}₽</Text>
                        </Section>
                    </Text>

                    <Text className="payment-email__signature">
                        С уважением, команда CosmeticGO
                    </Text>

                </Container>
            </Body>
        </Html>
    );
};

export default PaymentEmail;
