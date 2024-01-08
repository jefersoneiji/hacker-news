import { Header } from "../../components/header/header"
import { useShrink } from "../../utils/useShrink"

export const Home = () => {
    const [shrink] = useShrink()
    
    return (
        <div className='mx-auto' style={{ width: shrink ? '85%' : '' }}>
            <Header />
            <div className="container" style={{ backgroundColor: 'var(--spring-wood)' }} />
        </div>
    )
}