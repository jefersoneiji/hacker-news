import { Header } from "../../components/header/header"
import { HomeRow } from "../../components/home-row"
import { useShrink } from "../../utils/useShrink"

export const Home = () => {
    const [shrink] = useShrink()

    return (
        <div className='mx-auto' style={{ width: shrink ? '85%' : '' }}>
            <Header />
            <div className="container-fluid px-1" style={{ backgroundColor: 'var(--spring-wood)' }}>
                <HomeRow/>
                <HomeRow/>
                <HomeRow/>
            </div>
        </div>
    )
}