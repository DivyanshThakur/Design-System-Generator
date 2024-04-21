import React, { ReactNode } from 'react';
import Header from './Header';

interface Props {
    children: ReactNode;
}

const DashboardLayout = ({ children }: Props) => {
    return (
        <div>
            <Header />
            {children}
        </div>
    );
};

export default DashboardLayout;
