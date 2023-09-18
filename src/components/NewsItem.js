import React from "react";
import {
    descriptionSnippet,
    readingTime,
    titleSnippet,
} from "../utils/helperFunctions";

const NewsItem = (props) => {
    let { title, description, imageUrl, newsUrl, author, date, source } = props;
    return (
        <div className="relative overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8 h-full flex-col">
            <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

            <div className="sm:flex sm:justify-between sm:gap-4">
                <div>
                    <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                        {titleSnippet(title)}
                    </h3>

                    <p className="mt-1 text-xs font-medium text-gray-600">
                        By {!author ? "Unknown" : author}
                        <span className="font-bold"> ({source})</span>
                    </p>
                </div>

                <div className="hidden sm:block sm:shrink-0">
                    <img
                        alt="News"
                        src={
                            imageUrl
                                ? imageUrl
                                : "https://images.pexels.com/photos/159652/table-food-book-newspaper-159652.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        }
                        className="h-28 w-28 rounded-lg object-cover shadow-sm"
                    />
                </div>
            </div>

            <div className="mt-4">
                <p className="max-w-[40ch] text-sm text-gray-500">
                    {descriptionSnippet(description)}{" "}
                    <a
                        href={newsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-500 hover:text-blue-700 font-medium"
                    >
                        Continue reading...
                    </a>
                </p>
            </div>

            <dl className="flex gap-4 sm:gap-6 mt-5">
                <div className="flex flex-col-reverse">
                    <dt className="text-sm font-medium text-gray-600">
                        Published
                    </dt>
                    <dd className="text-xs text-gray-500">
                        {new Date(date).toDateString()}
                    </dd>
                </div>

                <div className="flex flex-col-reverse">
                    <dt className="text-sm font-medium text-gray-600">
                        Reading time
                    </dt>
                    <dd className="text-xs text-gray-500">
                        {readingTime(description)}
                    </dd>
                </div>
            </dl>

            <div className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></div>
        </div>
    );
};

export default NewsItem;
