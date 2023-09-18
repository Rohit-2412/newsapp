import React from "react";

const NewsItem = (props) => {
    let { title, description, imageUrl, newsUrl, author, date, source } = props;
    return (
        <div className="my-2">
            <div className="card">
                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        position: "absolute",
                        right: "0",
                    }}
                >
                    <span className="badge rounded-pill bg-danger">
                        {source}
                    </span>
                </div>
                <img
                    src={imageUrl}
                    style={{ height: "10rem", objectFit: "cover" }}
                    alt=" . . ."
                />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}. . .</p>
                    <p className="card-text">
                        <small className="text-danger">
                            By {!author ? "Unknown" : author} on{" "}
                            {new Date(date).toGMTString()}{" "}
                        </small>
                    </p>
                    <a
                        target="_blank"
                        rel="noreferrer"
                        href={newsUrl}
                        className="btn btn-sm btn-primary"
                    >
                        Read more
                    </a>
                </div>
            </div>
        </div>
    );
    // }
};

export default NewsItem;
