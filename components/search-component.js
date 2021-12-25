import axios from "/lib/axios";
import React, {Fragment, useState} from 'react';
import {SearchIcon} from "@heroicons/react/solid";
import {Dialog, Transition} from "@headlessui/react";
import {XIcon} from "@heroicons/react/outline";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function SearchComponent(props) {
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const showResults = searchResults.length > 0;

    const makeSearch = (event) => {
        setSearchText(event.target.value);
        setTimeout(() => {
            const result = axios.get(`/api/search?searchTerm=${searchText}`).then(response => {
                if (response.data && response.data.results) {
                    setSearchResults(response.data.results);
                }
            });
        }, 2000);
    }

    return (
        <>
            <Transition.Root show={props.searchModalState} as={Fragment}>
                <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={props.setSearchModalState}>
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                                                &#8203;
                                              </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full sm:p-6">
                                <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                                    <button
                                        type="button"
                                        className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        onClick={() => props.setSearchModalState(false)}
                                    >
                                        <span className="sr-only">Close</span>
                                        <XIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <SearchIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                            Search for Movies, TV shows and People
                                        </Dialog.Title>
                                        <div className="my-5">
                                            <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                                                <input
                                                    name="desktop-search-field"
                                                    id="desktop-search-field"
                                                    className="h-full w-full rounded-md border-transparent py-2 pl-8 pr-3 text-base text-gray-900 placeholder-gray-500 outline-none ring-2 border-transparent sm:block"
                                                    placeholder="Search"
                                                    type="search"
                                                    value={searchText}
                                                    onChange={makeSearch}
                                                />
                                            </div>

                                            <div className="">
                                                {showResults &&
                                                    <ul className="overflow-y-auto h-40 bg-white border border-gray-100 w-full mt-2 ">
                                                        {searchResults.length > 0 && searchResults.map(result => {
                                                            return (
                                                                <li key={result.id}
                                                                    className="pl-8 pr-2 py-1 border-b-2 border-gray-100 relative cursor-pointer hover:bg-yellow-50 hover:text-gray-900"
                                                                >
                                                                    <svg
                                                                        className="stroke-current absolute w-4 h-4 left-2 top-2"
                                                                        xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                        viewBox="0 0 24 24"
                                                                        stroke="currentColor">
                                                                        <path strokeLinecap="round"
                                                                              strokeLinejoin="round" strokeWidth="2"
                                                                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                                                        <path strokeLinecap="round"
                                                                              strokeLinejoin="round" strokeWidth="2"
                                                                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                                                                    </svg>
                                                                    <b>{result.name ?? result.title}</b>
                                                                </li>
                                                            )
                                                        })}
                                                    </ul>
                                                }
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="button"
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => props.setSearchModalState(false)}
                                    >
                                        Deactivate
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                                        onClick={() => props.setSearchModalState(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    )
}
