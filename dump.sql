--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: urls; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    url text NOT NULL,
    "shortUrl" text NOT NULL,
    "userId" integer NOT NULL,
    "visitCount" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.urls OWNER TO postgres;

--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.urls_id_seq OWNER TO postgres;

--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(100) NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.urls (id, url, "shortUrl", "userId", "visitCount", "createdAt") FROM stdin;
3	https://www.notion.so/Comandos-b-sicos-5710fc5d47d84b20aae4d60b436ba9af	ZBRt6V6WH3	1	3	2022-12-20 12:42:58.328783
6	https://www.notion.so/Projeto-Shortly-API-1-554fc5968d05428fb66053461b4e6e49	B6fuKHeyVW	1	1	2022-12-21 12:37:38.867089
7	https://chat.openai.com/chat	xhceS7AWR5	5	1	2022-12-21 14:36:51.5101
8	https://chat.openai.com/chat	3_M5hpIex1	6	0	2022-12-21 14:56:49.201747
9	https://chat.openai.com/chat	sj1W5UZvMs	6	0	2022-12-21 15:31:52.131581
10	https://chat.openai.com/chat	K5KZFc_i09	6	0	2022-12-23 11:39:35.786879
11	https://chat.openai.com/chat	M5qmtRmBoZ	6	0	2022-12-23 11:40:28.76972
5	https://www.notion.so/Projeto-Shortly-API-1-554fc5968d05428fb66053461b4e6e49	qM4IfuvIpu	1	2	2022-12-21 12:13:33.593318
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, password, "createdAt") FROM stdin;
1	Emerson	emerson@teste.com	$2b$10$yh/i0L/zUB/7InwTqc2EgeMXVqEuPTrgd30lypULLx8k6c5.8dUYe	2022-12-19 17:05:38.927704
5	Joao	joao@driven.com.br	$2b$10$3wNuoiUQYf/lZr9BT.VDIeddUsvxUHKcEzjKE2OxAWUVTdf8.TdMS	2022-12-21 14:34:37.478155
6	Joao22	joao22@driven.com.br	$2b$10$CkbivOQlTsNkYpCUGxS0h.VKrVj/JSItfkcddm8zUuR8kitrtngHe	2022-12-21 14:38:32.178959
7	Joao33	joao33@driven.com.br	$2b$10$h7jV9mtjGG.ZJUcUtbFEwerQR7Q9lvlohODT/jZCxpED96eIpM0S.	2022-12-21 15:28:22.324516
8	Joao35	joao35@driven.com.br	$2b$10$50txANOfARubvnFVSKFlNeQN01XoPc6ccBQEnRn.5SEF9pUHAVZAm	2022-12-21 15:28:45.616551
9	Adriana	adriana@driven.com.br	$2b$10$G3PM6p13HsGTmdT7ZOmVau7hHqm.JhLkrwWxZZI2PZkYUNuadvrbm	2022-12-23 11:18:04.740395
10	Adriana	adriana2@driven.com.br	$2b$10$LOxr1rdHPRyHw.yYl2SaleqcbOgo..DvdLqNc0OnmaR7YPoPu8vkq	2022-12-23 11:19:08.627476
\.


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.urls_id_seq', 11, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 10, true);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: urls urls_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

