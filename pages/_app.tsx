import "styles/globals.css";
import COLOR from 'shared/static/COLOR.json'
import type { AppProps } from "next/app";
import AppProvider from "providers/AppProvider";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Fragment } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import 'react-quill/dist/quill.snow.css';

ChartJS.register(ArcElement, Tooltip, Legend)

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <style jsx global>{`
        ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }

        ::-webkit-scrollbar-track {
          background: white;
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb {
          border-radius: 10px;
          background: #D1D2D4;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #D1D2D4;
        }
      `}</style>
      <div style={{ color: COLOR.PRIMARY }}>
        <AppProvider>
          <div style={{ fontFamily: 'Inter' }}>
            <Component {...pageProps} />
            <ToastContainer />
          </div>
        </AppProvider>
      </div>
    </Fragment>
  )
}
