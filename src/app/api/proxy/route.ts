import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const API_URL = 'https://api.le-systeme-solaire.net/rest.php';
const TOKEN = '83f315cd-7d27-4725-bb5e-dd67c2e49c4b';

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const queryString = url.search; // récupère tous les query params

    const apiResponse = await axios.get(`${API_URL}/bodies${queryString}`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });

    return NextResponse.json(apiResponse.data);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Erreur lors de l’appel à l’API' }, { status: 500 });
  }
}
