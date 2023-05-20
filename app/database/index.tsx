import PocketBase, { Record } from 'pocketbase';
import ms from "ms";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import jwtDecode from "jwt-decode";
import { useInterval } from "usehooks-ts";
import { PostsRecord } from '../src/generated/db-types';

const BASE_URL = "http://127.0.0.1:8090";
const fiveMinutesInMs = ms("5 minutes");
const twoMinutesInMs = ms("2 minutes");

const PocketContext = createContext({
    register: null,
    login: null,
    logout: null,
    findAll: null,
    user: null,
    token: null,
    pb: null
});

export const PocketProvider = ({children}) => {
    const pb = useMemo(() => new PocketBase(BASE_URL), []);

    const [token, setToken] = useState(pb.authStore.token);
    const [user, setUser] = useState(pb.authStore.model);

    useEffect(() => {
        return pb.authStore.onChange((token, model) => {
            setToken(token);
            setUser(model);
        });
    }, []);

    const register = useCallback(async (email, password) => {
        return await pb
            .collection("users")
            .create({email, password, passwordConfirm: password});
    }, []);

    const login = useCallback(async (email, password) => {
        return await pb.collection("users").authWithPassword(email, password);
    }, []);

    const logout = useCallback(() => {
        pb.authStore.clear();
    }, []);

    const findAll = useCallback(async (tableName) => {
        return await pb.collection(tableName).getList()
    }, []);

    const refreshSession = useCallback(async () => {
        if (!pb.authStore.isValid) return;
        const decoded : { exp: any }= jwtDecode(token);
        const tokenExpiration = decoded?.exp;
        const expirationWithBuffer = (decoded?.exp + fiveMinutesInMs) / 1000;
        if (tokenExpiration < expirationWithBuffer) {
            await pb.collection("users").authRefresh();
        }
    }, [token]);

    useInterval(refreshSession, token ? twoMinutesInMs : null);

    return (
        <PocketContext.Provider
            value={{ register, login, logout, findAll, user, token, pb }}
        >
            {children}
        </PocketContext.Provider>
    )
}

export const usePocket = () => useContext(PocketContext);