// react-email
import { Html, Head, Body, Container, Heading, Text } from '@react-email/components';


const DiscountEmail = ({ username }: { username: string; }) => {
    return (
        <Html>
            <Head>
                <style>
                    {`
                        .discount-email {
                            position: relative;
                            background: #ff15ef;
                            width: 100%;
                            height: 100%;
                            padding: 30px;
                            border-radius: 12px;
                        }

                        .discount-email__text {
                            color: #ffffff;
                            font-size: 24px;
                        }

                        .discount-email__signature {
                            font-weight: var(--font-inter);
                            font-size: 16px;
                            font-weight: 700;
                        }
                    `}
                </style>
            </Head>
            <Body>
                <Container className="discount-email">
                        
                    <Text className="discount-email__text">{username} - ваша заявка на получение скидочной карты получена! Не менее, чем через 3 рабочих дня мы отправим на эту почту ещё одно письмо, которое будет содержать точный процент вашей скидки. На него влияют такие факторы, как: дата вашей регистрации на нашем сервисе, общая сумма ваших покупок и многое другое! Не пропустите)</Text>

                    <Heading className="discount-email__signature">
                        С уважением, команда CosmeticGO
                    </Heading>

                </Container>
            </Body>
        </Html>
    );
};

export default DiscountEmail;
