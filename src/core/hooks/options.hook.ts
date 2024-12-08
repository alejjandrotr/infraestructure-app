import { useState, useEffect } from 'react';
import { BaseRepository } from '../Base/repositories/repository.abstract';
import { SelectOption } from '../../components/select/select-crud';

interface OptionsSelectProps {
    data: SelectOption[];
    loading: boolean;
    error: any;

}

const useOptionsForSelect = <T>(repository: BaseRepository<T>): OptionsSelectProps => {
    const [data, setData] = useState<SelectOption[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await repository.getOptions();
                setData(response);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [repository]);

    return { data, loading, error };
};

export default useOptionsForSelect;