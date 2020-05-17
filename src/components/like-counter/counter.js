import React from "react";
import * as Api from "../../api/api";
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import "./counter.scss";
import classNames from "classnames";
import Tooltip from '@material-ui/core/Tooltip';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';


export const LikeCounter = (props) => {
    const [like, setLike] = React.useState(null);
    const [active, setActive] = React.useState(false);

    React.useEffect(() => {
       Api.getArticleLike(props.articleId).then(article => {
            setLike({count: article.data.like, ref: article.ref['@ref']['id']})
        }).catch(fail => console.log(fail));
    }, []);

    const likeArticle = () => {
        if(!active){
            Api.likeArticle(like.ref);
            setLike({count: like.count+1, ref: like.ref})
            setActive(true);
        }
    };

    return (
        <Tooltip title="Like this content!" arrow>
            <div className={classNames("like-counter-container", {"liked" : active})} onClick={likeArticle}>
                <div className="like-counter">
                    <ThumbUpAltOutlinedIcon />
                    <span className="like-count">{like && like.count}</span>
                    <EmojiEventsIcon className={classNames("trophee-icon", {"trophee-animation" : active})} />
                </div>
            </div>
        </Tooltip>
    )
};
