import { bindActionCreators } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
import { itbookActions } from "../store/itbook/itbook.slice"

const actions = {
    ...itbookActions
}

export const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(actions, dispatch)
}