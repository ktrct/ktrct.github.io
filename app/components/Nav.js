import Link from 'next/link'

export default function Nav() {
    return (
        <nav className="sticky top-0 flex bg-blue-100 pt-8 pb-8 w-full text-black transition duration-100">
            <a className="pl-10 hover:text-amber-800" href="/">
            Home
            </a>
            <a className="pl-10" href="/alt">
            alt
            </a>
        </nav> 
    )
}