import '../styles/globals.css'
import Sidebar from "../components/sidebar";
import SearchComponent from "../components/search-component"

import { Fragment, useState, useEffect } from 'react'
import { Menu, Transition } from '@headlessui/react'

import { MenuAlt2Icon, PlusSmIcon as PlusSmIconOutline, SearchIcon } from '@heroicons/react/outline'

const userNavigation = [
    { name: 'Your profile', href: '#' },
    { name: 'Sign out', href: '#' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function MyApp({ Component, pageProps }) {
    const [searchModalState, setSearchModalState] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    useEffect(() => {
        document.addEventListener('keydown', logKey);
    })

    function logKey(event) {
        // Open the search modal when '/' key is pressed
        if (event.keyCode === 191) {
            setSearchModalState(!searchModalState);
        }
    }

      const toggleSearchModal = () => {
          setSearchModalState(!searchModalState);
      }

      return (
          <div className="h-full flex bg-gray-100">
                {/*Sidebar*/}
                <Sidebar />

              {/* Content area */}
              <div className="flex-1 flex flex-col overflow-hidden">
                  <header className="w-full">
                      <div className="relative z-10 flex-shrink-0 h-16 bg-white border-b border-gray-200 shadow-sm flex">
                          <button
                              type="button"
                              className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
                              onClick={() => setMobileMenuOpen(true)}
                          >
                              <span className="sr-only">Open sidebar</span>
                              <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
                          </button>
                          <div className="flex-1 flex justify-between px-4 sm:px-6">
                              <div className="flex-1 flex">
                                  <div className="w-full flex items-center md:ml-0">
                                      {/*<SearchComponent />*/}
                                      <span className="font-light tracking-wide indent-8 underline decoration-sky-500/70 decoration-2 underline-offset-4">Press '/' to search!</span>
                                  </div>
                              </div>
                              <div className="ml-2 flex items-center space-x-4 sm:ml-6 sm:space-x-6">
                                  <button onClick={toggleSearchModal}>
                                      <SearchIcon className="w-8 h-8"/>
                                  </button>

                                  <SearchComponent searchModalState={searchModalState} setSearchModalState={setSearchModalState}/>

                                  {/* Profile dropdown */}
                                  <Menu as="div" className="relative flex-shrink-0">
                                      <div>
                                          <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                              <span className="sr-only">Open user menu</span>
                                              <img
                                                  className="h-8 w-8 rounded-full"
                                                  src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
                                                  alt=""
                                              />
                                          </Menu.Button>
                                      </div>
                                      <Transition
                                          as={Fragment}
                                          enter="transition ease-out duration-100"
                                          enterFrom="transform opacity-0 scale-95"
                                          enterTo="transform opacity-100 scale-100"
                                          leave="transition ease-in duration-75"
                                          leaveFrom="transform opacity-100 scale-100"
                                          leaveTo="transform opacity-0 scale-95"
                                      >
                                          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                              {userNavigation.map((item) => (
                                                  <Menu.Item key={item.name}>
                                                      {({ active }) => (
                                                          <a
                                                              href={item.href}
                                                              className={classNames(
                                                                  active ? 'bg-gray-100' : '',
                                                                  'block px-4 py-2 text-sm text-gray-700'
                                                              )}
                                                          >
                                                              {item.name}
                                                          </a>
                                                      )}
                                                  </Menu.Item>
                                              ))}
                                          </Menu.Items>
                                      </Transition>
                                  </Menu>

                                  <button
                                      type="button"
                                      className="flex bg-indigo-600 p-1 rounded-full items-center justify-center text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                  >
                                      <PlusSmIconOutline className="h-6 w-6" aria-hidden="true" />
                                      <span className="sr-only">Add file</span>
                                  </button>
                              </div>
                          </div>
                      </div>
                  </header>

                  {/* Main content */}
                  <Component {...pageProps} />
              </div>
          </div>
      )
}

export default MyApp
