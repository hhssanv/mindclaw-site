import type { APIRoute, GetStaticPaths } from 'astro';
import { caminhosOg, respostaOg } from '../../../lib/og';

export const getStaticPaths = (() => caminhosOg('en')) satisfies GetStaticPaths;

export const GET: APIRoute = ({ props }) => respostaOg(props as Parameters<typeof respostaOg>[0]);
