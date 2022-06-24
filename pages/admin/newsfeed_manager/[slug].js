import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Button, Card, CardBody, CardFooter, CardSubtitle, CardText, CardTitle, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import databaseConnect from '../../../lib/databaseConnect';
import Newsfeed from '../../../models/newsfeed';
import bg1 from '../../../src/assets/images/bg/bg1.jpg';
import ReactMarkdown from "react-markdown";

function Index({ newsfeed }) {
    const [newsfeedData, setNewsFeedData] = useState(newsfeed)
    const router = useRouter();
    const handleUpdate = (e) => {
        e.preventDefault();
        axios.patch(`/api/admin/newsfeed/${newsfeed._id}`, { ...newsfeedData })
            .then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
    }

    const handleDelete = () => {
        const res = confirm('are you sure you want to delete')
        console.log(res)
        if (res) {
            axios.delete(`/api/admin/newsfeed/${newsfeed._id}`)
                .then(res => {
                    console.log(res)
                    router.push(`/admin/newsfeed_manager`)
                })
                .catch(err => {
                    console.log(err)
                })
        }
        else {
            console.log('deletion rejected')
        }

    }

    if (newsfeed)
        return <>
            <Form onSubmit={handleUpdate}>
                <Card>
                    <Image alt="Card image cap" src={bg1} />
                    <CardBody>

                        <CardTitle tag="h5">
                            <Input
                                type="text"
                                value={newsfeedData.title}
                                defaultValue={newsfeed.title}
                                onChange={(e) => setNewsFeedData(prev => ({ ...prev, title: e.target.value }))}
                            >
                            </Input>
                        </CardTitle>
                        {/* <CardSubtitle>{subtitle}</CardSubtitle> */}
                        <CardText className="mt-3">
                            <Input
                                value={newsfeedData.description}
                                defaultValue={newsfeed.description}
                                type="textarea"
                                onChange={(e) => setNewsFeedData(prev => ({ ...prev, description: e.target.value }))}
                            >
                            </Input>
                            <ReactMarkdown>{newsfeedData.description}</ReactMarkdown>
                        </CardText>

                    </CardBody>
                </Card>
                <Button className="float-end m-4" type='submit'>Edit</Button>
                <Button className="float-end m-4" color='danger' onClick={handleDelete}>Delete</Button>
            </Form>
        </>
    return <>
        404
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