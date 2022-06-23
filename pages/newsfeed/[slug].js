import Image from 'next/image';
import { Button, Card, CardBody, CardFooter, CardSubtitle, CardText, CardTitle, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import databaseConnect from '../../lib/databaseConnect';
import Newsfeed from '../../models/newsfeed';
import bg1 from '../../src/assets/images/bg/bg1.jpg';

function Index({ newsfeed }) {
    if (newsfeed)
        return <>
            <Card>
                <Image alt="Card image cap" src={bg1} />
                <CardBody>
                    <CardTitle tag="h5">{newsfeed.title}</CardTitle>
                    {/* <CardSubtitle>{subtitle}</CardSubtitle> */}
                    <CardText className="mt-3">{newsfeed.description}</CardText>
                    {/* <CardFooter>
                        <Form>
                            <Row style={{
                                display: 'flex',
                                // vertical center: 'center' }}
                                alignItems: 'center'
                            }}>
                                <Col xs={8}>
                                    <FormGroup>
                                        <Label for="exampleText">Text Area</Label>
                                        <Input id="exampleText" name="text" type="textarea" />
                                    </FormGroup>
                                </Col>
                                <Col xs={4}>
                                    <Button type="submit">
                                        Submit
                                    </Button>
                                </Col>

                            </Row>
                        </Form>
                    </CardFooter> */}
                </CardBody>
            </Card>
        </>
}

export default Index;

export async function getServerSideProps(context) {
    await databaseConnect();
    const slug = context.params.slug;
    const newsfeed = await Newsfeed.findById(slug);
    console.log(newsfeed)
    return {
        props: {
            newsfeed: JSON.parse(JSON.stringify(newsfeed))
        }, // will be passed to the page component as props
    }
}