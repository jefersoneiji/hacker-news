import { Link } from 'react-router-dom'

import logo from '../../components/header/y18.svg'
import { useShrink } from '../../utils/useShrink'

export const HeaderNoMenu = () => {
    const [shrink] = useShrink()
    return (
        <header>
            <nav className='navbar navbar-expand-lg' style={{ backgroundColor: "#ff6600", maxHeight: shrink ? '24px' : '' }}>
                <div className='container-fluid' style={{ paddingLeft: '2px' }}>
                    <Link to="/" className='navbar-brand d-flex align-items-center' style={{ marginRight: 0 }}>
                        <img src={logo} width={18} height={18} style={{ border: '1px solid white', marginRight: '4px' }} />
                        <b style={{ fontSize: '16px' }}>Submit</b>
                    </Link>
                </div>
            </nav>
        </header>
    )
}