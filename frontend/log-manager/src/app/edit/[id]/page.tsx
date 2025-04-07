import { fetchWithAuth } from '@/app/utils/fetchWithAuth';
import EditLogForm from './EditLogForm';
import { Log } from '@/app/types/Log';
import { API_ENDPOINTS_NODEAPP } from '@/config/api';
import { cookies } from 'next/headers';
import Header from '@/app/components/Header';

 export default async function EditLogPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params; 
  const token = (await cookies()).get('token')?.value;
  const log = await fetchWithAuth<Log>(API_ENDPOINTS_NODEAPP.LOGBYID(id) , 'GET', undefined, token);
        if (!log) {
            alert('Failed to fetch log.');
            return;
        }
  return <>
  <Header/>
  <EditLogForm initialLog={log}/>
  </>;
};