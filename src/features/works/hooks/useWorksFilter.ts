'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { WorksFilter, SortOption } from '../models/work';
import { URL_PARAMS } from '@/app-core/config/constants';

const defaultFilter: WorksFilter = {
    category: 'all',
    technology: null,
    year: null,
    search: '',
    sort: 'newest',
};

export function useWorksFilter() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    // 現在のフィルターをURLから読み込む
    const filter: WorksFilter = useMemo(() => ({
        category: searchParams.get(URL_PARAMS.worksFilter) || 'all',
        technology: searchParams.get(URL_PARAMS.worksTech),
        year: searchParams.get(URL_PARAMS.worksYear)
            ? parseInt(searchParams.get(URL_PARAMS.worksYear)!)
            : null,
        search: searchParams.get(URL_PARAMS.worksSearch) || '',
        sort: (searchParams.get(URL_PARAMS.worksSort) as SortOption) || 'newest',
    }), [searchParams]);

    // フィルター変更をURLに反映
    const updateFilter = useCallback((updates: Partial<WorksFilter>) => {
        const newFilter = { ...filter, ...updates };
        const params = new URLSearchParams();

        if (newFilter.category && newFilter.category !== 'all') {
            params.set(URL_PARAMS.worksFilter, newFilter.category);
        }
        if (newFilter.technology) {
            params.set(URL_PARAMS.worksTech, newFilter.technology);
        }
        if (newFilter.year) {
            params.set(URL_PARAMS.worksYear, newFilter.year.toString());
        }
        if (newFilter.search) {
            params.set(URL_PARAMS.worksSearch, newFilter.search);
        }
        if (newFilter.sort && newFilter.sort !== 'newest') {
            params.set(URL_PARAMS.worksSort, newFilter.sort);
        }

        const queryString = params.toString();
        router.push(`${pathname}${queryString ? `?${queryString}` : ''}`, {
            scroll: false,
        });
    }, [filter, pathname, router]);

    const resetFilter = useCallback(() => {
        router.push(pathname, { scroll: false });
    }, [pathname, router]);

    return {
        filter,
        updateFilter,
        resetFilter,
        isFiltered: filter.category !== 'all' ||
            filter.technology !== null ||
            filter.year !== null ||
            filter.search !== '',
    };
}
