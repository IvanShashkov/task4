import api from "../../api/api"

type getUsersProps = {
    idCollection?: Array<string>
}

const adminApi = {
    getUsers: () => {
        return api.get('/users', {})
    },
    getBan: ({ idCollection }: getUsersProps) => {
        return api.post('/ban', { idCollection })
    },
    getUnban: ({ idCollection }: getUsersProps) => {
        return api.post('/unban', { idCollection })
    },
    getDelete: ({ idCollection }: getUsersProps) => {
        return api.post('/delete', { idCollection })
    }
}

export default adminApi