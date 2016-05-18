import * as Colors from 'material-ui/lib/styles/colors'
import Spacing from 'material-ui/lib/styles/spacing'
import zIndex from 'material-ui/lib/styles/zIndex'
import ColorManipulator from 'material-ui/lib/utils/color-manipulator'

const palette = {
    primary1Color: Colors.blue500,
    primary2Color: Colors.blue300,
    primary3Color: Colors.blue100,
    accent1Color: Colors.pink500,
    accent2Color: Colors.pink300,
    accent3Color: Colors.pink100
}

const customTheme = {
    spacing: Spacing,
    zIndex: zIndex,
    fontFamily: 'Roboto, sans-serif',
    palette,
    tabs: {
        backgroundColor: Colors.grey200,
        textColor: ColorManipulator.fade(palette.primary1Color, 0.6),
        selectedTextColor: palette.primary1Color
    }
}

export default customTheme
