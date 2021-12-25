import {getStaticProps} from "../pages";
import tmdb from "../lib/tmdb";
import React, {useCallback, useEffect, useState} from 'react';

export default function Show(props) {

    return (
        <div onClick={() => props.updateSelected(props.show)} key={props.show.id} className="group relative">
            <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                <img
                    src={`https://image.tmdb.org/t/p/w500/${props.show.backdrop_path}`}
                    alt={props.show.title}
                    className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                />
            </div>
            <div className="mt-4 flex justify-between">
                <div>
                    <h3 className="text-sm text-gray-700">
                        <a href="#">
                            <span aria-hidden="true" className="absolute inset-0" />
                            { props.show.name ?? props.show.title }
                        </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{props.show.media_type}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">{props.show.vote_average}</p>
            </div>
        </div>
    )
}
