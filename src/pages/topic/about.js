import React from "react"
import Layout from "../../components/layout"

const aboutPage = ({data, location}) => {
    return (
        <Layout location={location}>

            <div style={{padding: "0px 60px 0px 60px"}}>
                <div style={{height: "70px", fontSize: "21px"}} className="capital-letters font1">About</div>
                <div style={{display: "flex"}}>
                    <img style={{marginRight: '15px'}} src={"../../mariedet-about.jpg"} height={400} alt="author" />
                    <section style={{textAlign: "justify"}}>
                        I'm french and I live in Paris. I like to ride to places, which inspire me no matter far or close.
                        Cycling for me, is in a way, the melting pot of things I like. It's exercise, being outdoors, meeting new people, travelling and doing races. I have seen places and met people that I would never have if it weren’t for the bike. Cycling push me to be better every time. I like to climb mountains passes around the world, I think I'm an addict to climb up mountains because it's pushed me to go beyond my limit and I like it.
                    </section>
                </div>
            </div>
        </Layout>
    )
};

export default aboutPage;

