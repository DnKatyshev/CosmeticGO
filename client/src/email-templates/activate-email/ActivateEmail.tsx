// react-email
import { Html, Head, Body, Container, Heading, Text, Row } from '@react-email/components';


const ActivateEmail = ({ username, activateCode }: { username: string; activateCode: string }) => {
    return (
        <Html>
            <Head>
                <style>
                    {`
                        .activate-email {
                            position: relative;
                            background: #fff3dc;
                            width: 100%;
                            height: 100%;
                            padding: 30px;
                            border-radius: 12px;
                        }

                        .activate-email__title {
                            color: #9000ff;
                            font-size: 24px;
                        }

                        .activate-email__code {
                            display: flex;
                            column-gap: 10px;
                            font-family: var(--font-raleway);
                            font-weight: 900;
                        }

                        .activate-email__signature {
                            font-weight: var(--font-inter);
                            font-size: 14px;
                            font-weight: 700;
                        }
                    `}
                </style>
            </Head>
            <Body>
                <Container className="activate-email">
                        
                    <Heading className="activate-email__title">Привет, {username}!</Heading>

                    <Text className="activate-email__code">
                        Код: {activateCode}
                    </Text>

                    <Text className="activate-email__signature">
                        С уважением, команда CosmeticGO
                    </Text>

                </Container>
            </Body>
        </Html>
    );
};

export default ActivateEmail;
