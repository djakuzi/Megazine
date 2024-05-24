import React from "react"
import ContentLoader from "react-content-loader"

const DeviceSkeleton = (props: any) => (
  <ContentLoader 
    speed={1}
    width={333}
    height={400}
    viewBox="0 0 333 400"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="84" y="22" rx="17" ry="17" width="162" height="204" /> 
    <rect x="27" y="242" rx="18" ry="18" width="279" height="35" /> 
    <rect x="1" y="299" rx="19" ry="19" width="330" height="33" /> 
    <rect x="6" y="360" rx="12" ry="12" width="125" height="31" /> 
    <rect x="204" y="360" rx="7" ry="7" width="120" height="26" />
  </ContentLoader>
)

export default DeviceSkeleton 