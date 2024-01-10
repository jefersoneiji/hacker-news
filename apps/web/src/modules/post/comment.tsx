import { Link } from "react-router-dom"
import dayjs, { extend } from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
extend(relativeTime)

import triangle from '../../components/home-row/triangle.svg'

export const Comment = () => {
    const voted = false
    const data = { link: 'https://localhost:4000', title: 'OpenBSD Cinnamon', createdAt: new Date() }

    return (
        <div className="d-flex flex-row py-1" style={{ fontSize: 14 }}>
            <div className="d-flex align-items-center align-self-start" style={{ color: 'var(--gray)' }}>
                {!voted &&
                    <img
                        onClick={() => undefined}
                        className='mt-1'
                        src={triangle}
                        width={12}
                        height={12}
                        style={{ marginRight: 4 }}
                    />}
                {voted && <span style={{ marginRight: 16 }} />}
            </div>
            <div className="d-flex flex-column">
                <div className='d-flex flex-row align-items-end'>
                    <Link to='/' className='link ms-1'>jefersoneiji</Link>
                    <Link to='/' className='link ms-1'>{dayjs(data.createdAt).fromNow()}</Link>

                    <Link to='/' className='link ms-1'>| next [–]</Link>
                </div>
                <Link to={data.link} className='text-dark text-decoration-none mt-1'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis scelerisque viverra quam, eu congue felis iaculis nec. Etiam nec metus mi. Sed massa urna, lacinia vitae sollicitudin ut, imperdiet sed mauris. Pellentesque fermentum placerat volutpat. Aliquam tempus posuere lacus, ultrices bibendum est egestas vel. Proin nisi nunc, dignissim at purus id, fermentum tempus enim. Nunc nec quam at lorem feugiat semper feugiat eu lorem. Donec dignissim bibendum arcu et dignissim. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                </Link>
            </div>
        </div >
    )
}