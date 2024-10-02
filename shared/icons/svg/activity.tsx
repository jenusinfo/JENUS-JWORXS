export default function ActivitySvg({ fill = "#3F4044" }: { fill?: string }) {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M14.25 4.34528C14.25 4.12503 13.9859 4.0124 13.8269 4.1649L6.33984 11.3495C6.17646 11.5063 6.28902 11.7821 6.51547 11.7799L8.48236 11.76C9.45572 11.7502 10.25 12.5365 10.25 13.5099V19.5039C10.25 19.7294 10.5251 19.8396 10.6809 19.6765L17.8439 12.1724C17.9957 12.0133 17.883 11.7497 17.663 11.7497H16C15.0335 11.7497 14.25 10.9662 14.25 9.99975V4.34528ZM12.7884 3.0826C13.9008 2.01512 15.75 2.80354 15.75 4.34528V9.99975C15.75 10.1378 15.862 10.2497 16 10.2497H17.663C19.2026 10.2497 19.9919 12.0944 18.9289 13.2081L11.7659 20.7122C10.6758 21.8542 8.75004 21.0826 8.75004 19.5039V13.5099C8.75004 13.3708 8.63656 13.2585 8.49751 13.2599L6.53062 13.2798C4.94557 13.2958 4.15754 11.3647 5.30127 10.2672L12.7884 3.0826Z" fill={fill} />
        </svg>

    )
}