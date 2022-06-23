
import Image from "next/image";
import { Card, CardBody, CardSubtitle, CardText, CardTitle, Col, Row, Button } from "reactstrap";
import databaseConnect from "../../lib/databaseConnect";
import Newsfeed from "../../models/newsfeed";
import bg1 from '../../src/assets/images/bg/bg1.jpg';

function Index({ newsfeed }) {
    const data = {
        image: bg1,
        title: 'This is simple blog',
        subtitle: '2 comments, 1 Like',
        description:
            'This is a wider card with supporting text below as a natural lead-in to additional content.',
        btnbg: 'primary'
    };
    const BlogData = newsfeed?.map(data => ({
        ...data, image: bg1, subtitle: `${data.seen.length} seen, ${data.comments.length} comments`, btnbg: 'primary'
    }))
    return <>
        <Row>
            {BlogData?.map(blg => (
                <Col sm="6" lg="6" xl="3" key={blg.title}>
                    <Blog
                        image={blg.image}
                        title={blg.title}
                        subtitle={blg.subtitle}
                        text={blg.description}
                        color={blg.btnbg}
                    />
                </Col>
            ))}
        </Row>
    </>
}

export default Index;

export async function getServerSideProps(context) {
    await databaseConnect();
    const newsfeed = await Newsfeed.find();
    return {
        props: {
            newsfeed: JSON.parse(JSON.stringify(newsfeed))
        }, // will be passed to the page component as props
    }
}

const Blog = ({ image, title, subtitle, text, color }) => {
    return (
        <Card>
            <Image alt="Card image cap" src={image} />
            <CardBody className="p-4">
                <CardTitle tag="h5">{title}</CardTitle>
                <CardSubtitle>{subtitle}</CardSubtitle>
                <CardText className="mt-3">{text}</CardText>
                <Button color={color}>Read More</Button>
            </CardBody>
        </Card>
    );
};