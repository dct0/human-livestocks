--
-- PostgreSQL database dump
--

-- Dumped from database version 16.0
-- Dumped by pg_dump version 16.0 (Homebrew)

-- Started on 2023-10-24 11:38:02 +08

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

--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- TOC entry 3404 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 215 (class 1259 OID 16389)
-- Name: Account; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Account" (
    id text NOT NULL,
    "userId" text NOT NULL,
    type text NOT NULL,
    provider text NOT NULL,
    "providerAccountId" text NOT NULL,
    refresh_token text,
    access_token text,
    expires_at integer,
    token_type text,
    scope text,
    id_token text,
    session_state text
);


--
-- TOC entry 218 (class 1259 OID 16408)
-- Name: Guild; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Guild" (
    id text NOT NULL,
    name text NOT NULL,
    "lastCronnedAt" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- TOC entry 219 (class 1259 OID 16416)
-- Name: Member; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Member" (
    id text NOT NULL,
    username text NOT NULL,
    rate numeric(65,30) DEFAULT 1 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "guildId" text NOT NULL
);


--
-- TOC entry 220 (class 1259 OID 16425)
-- Name: Message; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Message" (
    id text NOT NULL,
    content text NOT NULL,
    attachments text[],
    score numeric(65,30) NOT NULL,
    "createdById" text,
    "guildId" text,
    "channelId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- TOC entry 221 (class 1259 OID 16433)
-- Name: StockPrice; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."StockPrice" (
    id text NOT NULL,
    price numeric(65,30) NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "memberId" text
);


--
-- TOC entry 216 (class 1259 OID 16396)
-- Name: User; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."User" (
    id text NOT NULL,
    name text,
    email text,
    "emailVerified" timestamp(3) without time zone,
    image text
);


--
-- TOC entry 217 (class 1259 OID 16403)
-- Name: VerificationToken; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."VerificationToken" (
    identifier text NOT NULL,
    token text NOT NULL,
    expires timestamp(3) without time zone NOT NULL
);


--
-- TOC entry 3392 (class 0 OID 16389)
-- Dependencies: 215
-- Data for Name: Account; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3395 (class 0 OID 16408)
-- Dependencies: 218
-- Data for Name: Guild; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3396 (class 0 OID 16416)
-- Dependencies: 219
-- Data for Name: Member; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3397 (class 0 OID 16425)
-- Dependencies: 220
-- Data for Name: Message; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3398 (class 0 OID 16433)
-- Dependencies: 221
-- Data for Name: StockPrice; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3393 (class 0 OID 16396)
-- Dependencies: 216
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3394 (class 0 OID 16403)
-- Dependencies: 217
-- Data for Name: VerificationToken; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3229 (class 2606 OID 16395)
-- Name: Account Account_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Account"
    ADD CONSTRAINT "Account_pkey" PRIMARY KEY (id);


--
-- TOC entry 3237 (class 2606 OID 16415)
-- Name: Guild Guild_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Guild"
    ADD CONSTRAINT "Guild_pkey" PRIMARY KEY (id);


--
-- TOC entry 3239 (class 2606 OID 16424)
-- Name: Member Member_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Member"
    ADD CONSTRAINT "Member_pkey" PRIMARY KEY (id);


--
-- TOC entry 3242 (class 2606 OID 16432)
-- Name: Message Message_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Message"
    ADD CONSTRAINT "Message_pkey" PRIMARY KEY (id);


--
-- TOC entry 3244 (class 2606 OID 16440)
-- Name: StockPrice StockPrice_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."StockPrice"
    ADD CONSTRAINT "StockPrice_pkey" PRIMARY KEY (id);


--
-- TOC entry 3233 (class 2606 OID 16402)
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- TOC entry 3230 (class 1259 OID 16441)
-- Name: Account_provider_providerAccountId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON public."Account" USING btree (provider, "providerAccountId");


--
-- TOC entry 3240 (class 1259 OID 16445)
-- Name: Member_username_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Member_username_key" ON public."Member" USING btree (username);


--
-- TOC entry 3231 (class 1259 OID 16442)
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- TOC entry 3234 (class 1259 OID 16444)
-- Name: VerificationToken_identifier_token_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON public."VerificationToken" USING btree (identifier, token);


--
-- TOC entry 3235 (class 1259 OID 16443)
-- Name: VerificationToken_token_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "VerificationToken_token_key" ON public."VerificationToken" USING btree (token);


--
-- TOC entry 3245 (class 2606 OID 16446)
-- Name: Account Account_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Account"
    ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3246 (class 2606 OID 16451)
-- Name: Member Member_guildId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Member"
    ADD CONSTRAINT "Member_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES public."Guild"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3247 (class 2606 OID 16456)
-- Name: Message Message_createdById_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Message"
    ADD CONSTRAINT "Message_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES public."Member"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3248 (class 2606 OID 16461)
-- Name: StockPrice StockPrice_memberId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."StockPrice"
    ADD CONSTRAINT "StockPrice_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES public."Member"(id) ON UPDATE CASCADE ON DELETE SET NULL;


-- Completed on 2023-10-24 11:38:02 +08

--
-- PostgreSQL database dump complete
--

