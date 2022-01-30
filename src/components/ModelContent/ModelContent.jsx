import { YouTube } from '@mui/icons-material';
import { Button, Container, Fade } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { img_500, unavailable, unavailableLandscape } from '../../config/config';
import '.././ModelContent/ContentModel.css'

const ModelContent = ({ type, id }) => {

    const [content, setContent] = useState();
    const [video, setVideo] = useState();



    const fetchData = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/${type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        );
        // console.log(data);
        setContent(data);
        // console.log(data);
    };

    const fetchVideo = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        );
        //   console.log(data.results[0]);
        setVideo(data.results[0]?.key);
    };



    useEffect(() => {
        fetchData();
        fetchVideo();
        // eslint-disable-next-line
    }, []);
    return (


        <div className="main_class">
            {content &&
                <div className="paper">
                    <div className="content_modal">
                        <img src={content.poster_path ? `${img_500}/${content.poster_path}` :
                            unavailable} alt={content.name || content.title}
                            className="ContentModal__portrait" />
                        <img src={content.backdrop_path
                            ? `${img_500}/${content.backdrop_path}` : unavailableLandscape}
                            alt={content.name || content.title} className="ContentModal__landscape"
                        />

                        <div className="ContentModal__about">
                            <span className="ContentModal__title">
                                {content.name || content.title} (
                                {(
                                    content.first_air_date ||
                                    content.release_date ||
                                    "-----"
                                ).substring(0, 4)}
                                )
                            </span>
                            {content.tagline && (
                                <i className="tagline">{content.tagline}</i>
                            )}

                            <span className="ContentModal__description">
                                {content.overview}
                            </span>

                            {/* <div>
                    <Carousel id={id} media_type={media_type} />
                  </div> */}

                            <Button
                                variant="contained"
                                startIcon={<YouTube />}
                                color="secondary"
                                target="__blank"
                                href={`https://www.youtube.com/watch?v=${video}`}
                            >
                                Watch the Trailer
                            </Button>
                        </div>
                    </div>
                </div>
            }
        </div>

    )
};

export default ModelContent;
