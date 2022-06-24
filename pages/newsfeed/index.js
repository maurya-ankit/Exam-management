
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Card, CardBody, CardSubtitle, CardText, CardTitle, Col, Row, Button } from "reactstrap";
import databaseConnect from "../../lib/databaseConnect";
import Newsfeed from "../../models/newsfeed";
import bg1 from '../../src/assets/images/bg/bg1.jpg';
import { useSession, getSession } from "next-auth/react"
import Group from "../../models/group";
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
            {BlogData.reverse()?.map(blg => (
                <Col sm="6" lg="6" xl="3" key={blg.title}>
                    <Blog
                        image={blg.image}
                        title={blg.title}
                        subtitle={blg.subtitle}
                        text={blg.description}
                        color={blg.btnbg}
                        to={`/newsfeed/${blg._id}`}
                    />
                </Col>
            ))}
        </Row>
    </>
}

export default Index;

export async function getServerSideProps(context) {
    await databaseConnect();
    const user = await getSession(context)
    const userEmail = user?.user.email
    let groups = await Group.aggregate([
        {
            '$match': {
                'emails': userEmail
            }
        }
    ]).exec()
    groups = groups.map(group => group.name)
    console.log(groups)
    const newsfeed = await Newsfeed.find({ group: { '$in': groups } });

    return {
        props: {
            newsfeed: JSON.parse(JSON.stringify(newsfeed))
        }, // will be passed to the page component as props
    }
}

const Blog = ({ image, title, subtitle, text, color, to }) => {
    const router = useRouter();
    return (
        <Card>
            <Image alt="Card image cap" src={image} />
            <CardBody className="p-4">
                <CardTitle tag="h5">{title}</CardTitle>
                <CardSubtitle>{subtitle}</CardSubtitle>
                <CardText className="mt-3">{text.slice(0, 50)} ...</CardText>
                <Button color={color} onClick={() => router.push(to)}>Read More</Button>
            </CardBody>
        </Card>
    );
};