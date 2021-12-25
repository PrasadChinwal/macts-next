import Head from 'next/head'
import tmdb from "/lib/tmdb";
import Show from "/components/show";
import React, {useCallback, useEffect, useState} from 'react';
import AsideDetail from "../components/aside-detail";
import {ViewGridIcon as ViewGridIconSolid, ViewListIcon} from "@heroicons/react/solid";

const tabs = [
    { name: 'Recently Viewed', href: '#', current: true },
    { name: 'Recently Added', href: '#', current: false },
    { name: 'Favorited', href: '#', current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Home({props, data}) {
    const [currentSelected, setCurrentSelected] = useState({});
    const shouldShowAside = Object.keys(currentSelected).length > 0;

    const updateSelected = (selected) => {
        setCurrentSelected(selected)
    }

    return (
      <>
          <div className="flex-1 flex items-stretch overflow-hidden">
              <main className="flex-1 overflow-y-auto">
                  <div className="pt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="flex">
                          <h1 className="flex-1 text-2xl font-bold text-gray-900">Photos</h1>
                          <div className="ml-6 bg-gray-100 p-0.5 rounded-lg flex items-center sm:hidden">
                              <button
                                  type="button"
                                  className="p-1.5 rounded-md text-gray-400 hover:bg-white hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                              >
                                  <ViewListIcon className="h-5 w-5" aria-hidden="true" />
                                  <span className="sr-only">Use list view</span>
                              </button>
                              <button
                                  type="button"
                                  className="ml-0.5 bg-white p-1.5 rounded-md shadow-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                              >
                                  <ViewGridIconSolid className="h-5 w-5" aria-hidden="true" />
                                  <span className="sr-only">Use grid view</span>
                              </button>
                          </div>
                      </div>

                      {/* Tabs */}
                      <div className="mt-3 sm:mt-2">
                          <div className="sm:hidden">
                              <label htmlFor="tabs" className="sr-only">
                                  Select a tab
                              </label>
                              {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
                              <select
                                  id="tabs"
                                  name="tabs"
                                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                  defaultValue="Recently Viewed"
                              >
                                  <option>Recently Viewed</option>
                                  <option>Recently Added</option>
                                  <option>Favorited</option>
                              </select>
                          </div>
                          <div className="hidden sm:block">
                              <div className="flex items-center border-b border-gray-200">
                                  <nav className="flex-1 -mb-px flex space-x-6 xl:space-x-8" aria-label="Tabs">
                                      {tabs.map((tab) => (
                                          <a
                                              key={tab.name}
                                              href={tab.href}
                                              aria-current={tab.current ? 'page' : undefined}
                                              className={classNames(
                                                  tab.current
                                                      ? 'border-indigo-500 text-indigo-600'
                                                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                                                  'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                                              )}
                                          >
                                              {tab.name}
                                          </a>
                                      ))}
                                  </nav>
                                  <div className="hidden ml-6 bg-gray-100 p-0.5 rounded-lg items-center sm:flex">
                                      <button
                                          type="button"
                                          className="p-1.5 rounded-md text-gray-400 hover:bg-white hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                                      >
                                          <ViewListIcon className="h-5 w-5" aria-hidden="true" />
                                          <span className="sr-only">Use list view</span>
                                      </button>
                                      <button
                                          type="button"
                                          className="ml-0.5 bg-white p-1.5 rounded-md shadow-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                                      >
                                          <ViewGridIconSolid className="h-5 w-5" aria-hidden="true" />
                                          <span className="sr-only">Use grid view</span>
                                      </button>
                                  </div>
                              </div>
                          </div>
                      </div>

                      {/* Gallery */}
                      <section className="mt-8 pb-16" aria-labelledby="gallery-heading">
                          <h2 id="gallery-heading" className="sr-only">
                              Recently viewed
                          </h2>
                          <ul
                              role="list"
                              className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
                          >
                              {data && data.results && data.results.map((item, index) => (
                                  <Show key={item.id} show={item} updateSelected={updateSelected}/>
                                ))
                              }
                          </ul>
                      </section>
                  </div>
              </main>

              {/* Details sidebar */}
              { shouldShowAside &&
                  <AsideDetail show={currentSelected} updateSelected={updateSelected}/>
              }
          </div>
    </>
  )
}

export async function getStaticProps(context) {
  const results = await tmdb.get('/trending/all/day');
  const data = results.data
  console.log(data)
  return {
    props: { data },
  }
}
