--
-- PostgreSQL database dump
--

-- Dumped from database version 17.0
-- Dumped by pg_dump version 17.0

-- Started on 2024-10-26 23:20:52

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- TOC entry 218 (class 1259 OID 16412)
-- Name: laliga; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.laliga (
    id integer NOT NULL,
    club_name text,
    city_name text,
    stadium_name text,
    abreviation text,
    manager_name text,
    nickname text,
    date_of_establishment date,
    main_sponsor text,
    trophies_won integer,
    current_captains text[]
);


ALTER TABLE public.laliga OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16411)
-- Name: laliga_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.laliga_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.laliga_id_seq OWNER TO postgres;

--
-- TOC entry 4850 (class 0 OID 0)
-- Dependencies: 217
-- Name: laliga_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.laliga_id_seq OWNED BY public.laliga.id;


--
-- TOC entry 4695 (class 2604 OID 16415)
-- Name: laliga id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laliga ALTER COLUMN id SET DEFAULT nextval('public.laliga_id_seq'::regclass);


--
-- TOC entry 4844 (class 0 OID 16412)
-- Dependencies: 218
-- Data for Name: laliga; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.laliga (id, club_name, city_name, stadium_name, abreviation, manager_name, nickname, date_of_establishment, main_sponsor, trophies_won, current_captains) FROM stdin;
2	Real Madrid Club de Fútbol	Madrid	Santiago Bernabéu Stadium	RMA	Carlo Ancelotti	Los Blancos	1902-03-06	Emirates	36	{"Luka Modrić","Daniel Carvajal"}
3	Atlético de Madrid	Madrid	Riyadh Air Metropolitano	ATM	Diego Simeone	Rojiblancos	1903-04-26	Riyadh Air	4	{Koke,"Jan Oblak"}
4	Sevilla Fútbol Club	Seville	Ramón Sánchez Pizjuán Stadium	SEV	Francisco Javier García Pimienta	Los Nervionenses	1890-01-25	Castore	1	{"Jesús Navas","Nemanja Gudelj"}
1	Fútbol Club Barcelona	Barcelona	Camp Nou	FCB	Hans-Dieter Flick	Barca	1899-11-29	Spotify	27	{"Marc-André ter Stegen","Frenkie de Jong"}
5	Real Sociedad de Fútbol	San Sebastián	Anoeta Stadium	RSO	Imanol Alguacil Barrenetxea	La Real	1909-09-07	Yasuda Group	2	{"Mikel Oyarzabal Ugarte","Igor Zubeldia Elorza"}
7	Villarreal Club de Fútbol	Villarreal	Estadio de la Cerámica	VIL	Marcelino García Toral	El Submarino Amarillo	1923-03-10	Pamesa cerámica	0	{"Raúl Albiol Tortajada","Alejandro Baena Rodríguez"}
8	Athletic Club de Bilbao	Bilbao	San Mamés Stadium	ATH	Ernesto Valverde Tejedor	Lehoiak	1898-07-18	Kutxabank	8	{"Yuri Berchiche Izeta","Óscar de Marcos Arana"}
9	Girona Fútbol Club	Girona	Estadi Montilivi	GIR	Miguel Ángel Sánchez Muñoz	Blanquivermells	1930-07-23	Etihad Airways	0	{"Cristhian Stuani","Juan Pedro Ramírez López"}
10	Reial Club Deportiu Espanyol de Barcelona	Barcelona	RCDE Stadium	ESP	José Manuel González Álvarez	Periquitos	1900-10-28	Conserves Dani	0	{"Sergi Gómez Sola","Javier Puado Díaz"}
6	Valencia Club de Fútbol	Valencia	Mestalla Stadium	VAL	Rubén Baraja Vegas	Los Ches	1919-03-18	TM Real Estate Group	6	{"José Luis Gayà Peña","José Luis García Vayá Pepelu"}
\.


--
-- TOC entry 4851 (class 0 OID 0)
-- Dependencies: 217
-- Name: laliga_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.laliga_id_seq', 10, true);


--
-- TOC entry 4697 (class 2606 OID 16419)
-- Name: laliga laliga_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.laliga
    ADD CONSTRAINT laliga_pkey PRIMARY KEY (id);


-- Completed on 2024-10-26 23:20:52

--
-- PostgreSQL database dump complete
--

