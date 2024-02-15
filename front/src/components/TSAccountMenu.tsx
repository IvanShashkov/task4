import {Button, Dropdown, MenuProps} from "antd"
import {FrownOutlined} from "@ant-design/icons"

import {useDispatch, useSelector} from "react-redux"
import {AppDispatch, RootState} from "../store/store"
import {logout} from "../store/initialSlice"
import {useNavigate} from "react-router-dom"

const TSAccountMenu = () => {

    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const username = useSelector((state: RootState) => state.initial.username)

    const items:MenuProps['items'] = [
        {
            key: 1,
            label: 'quit',
            onClick: () => dispatch(logout({ navigate })),
            icon: <FrownOutlined />,
        }
    ]

    return (
        <>
            {username &&
                <Dropdown
                    placement={'bottom'}
                    menu={{ items }}
                >
                    <Button>
                        {username}
                    </Button>
                </Dropdown>
            }
        </>
    )
}

export default TSAccountMenu