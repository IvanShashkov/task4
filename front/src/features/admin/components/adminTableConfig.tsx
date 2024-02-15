import {Typography} from "antd"
import dayjs from "dayjs";

export type user = {
    _id: number,
    username: string,
    email: string,
    registerData: Date,
    lastLogin: Date,
    isBanned: boolean
}

const adminTableConfig = () => ([
    {
        title: <Typography>ID</Typography>,
        render: (_: any, row: user) => <Typography>{row._id}</Typography>,
    },
    {
        title: <Typography>username</Typography>,
        render: (_: any, row: user) => <Typography>{row.username}</Typography>,
    },
    {
        title: <Typography>email</Typography>,
        render: (_: any, row: user) => <Typography>{row.email}</Typography>,
    },
    {
        title: <Typography>register data</Typography>,
        render: (_: any, row: user) => <Typography>{dayjs(row.registerData).format('H:mm DD.MM.YYYY')}</Typography>,
    },
    {
        title: <Typography>last login</Typography>,
        render: (_: any, row: user) => <Typography>{dayjs(row.lastLogin).format('H:mm DD.MM.YYYY')}</Typography>,
    },
    {
        title: <Typography>status</Typography>,
        render: (_: any, row: user) => <Typography>{row.isBanned ? 'Banned' : 'Active'}</Typography>,
    },
])

export default adminTableConfig