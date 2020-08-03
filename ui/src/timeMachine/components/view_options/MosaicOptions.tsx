// Libraries
import React, {SFC} from 'react'
import {connect, ConnectedProps} from 'react-redux'

// Components
import {Form, Input, Grid, MultiSelectDropdown} from '@influxdata/clockface'
import AxisAffixes from 'src/timeMachine/components/view_options/AxisAffixes'
import TimeFormat from 'src/timeMachine/components/view_options/TimeFormat'

// Actions
import {
  setFillColumns,
  setYAxisLabel,
  setXAxisLabel,
  setAxisPrefix,
  setAxisSuffix,
  setColorHexes,
  setYDomain,
  setXColumn,
  setMosaicYColumn,
  setTimeFormat,
} from 'src/timeMachine/actions'

// Utils
import {
  getGroupableColumns,
  getMosaicFillColumnsSelection,
  getXColumnSelection,
  getMosaicYColumnSelection,
  getNumericColumns,
  getStringColumns,
  getActiveTimeMachine,
} from 'src/timeMachine/selectors'

// Constants
import {GIRAFFE_COLOR_SCHEMES} from 'src/shared/constants'

// Types
import {ComponentStatus} from '@influxdata/clockface'
import {AppState, NewView, MosaicViewProperties} from 'src/types'
import HexColorSchemeDropdown from 'src/shared/components/HexColorSchemeDropdown'
import AutoDomainInput from 'src/shared/components/AutoDomainInput'
import ColumnSelector from 'src/shared/components/ColumnSelector'

interface OwnProps {
  xColumn: string
<<<<<<< HEAD
  yColumn: string
=======
  yColumn: string[]
>>>>>>> 56a761484829a76d9c861c07c5ff7a5ae61c3bbc
  fillColumns: string
  xDomain: number[]
  yDomain: number[]
  xAxisLabel: string
  yAxisLabel: string
  xPrefix: string
  xSuffix: string
  yPrefix: string
  ySuffix: string
  colors: string[]
  showNoteWhenEmpty: boolean
}

type ReduxProps = ConnectedProps<typeof connector>
type Props = OwnProps & ReduxProps

const MosaicOptions: SFC<Props> = props => {
  const {
    fillColumns,
    availableGroupColumns,
    yAxisLabel,
    xAxisLabel,
    onSetFillColumns,
    colors,
    onSetColors,
    onSetYAxisLabel,
    onSetXAxisLabel,
    yPrefix,
    ySuffix,
    onUpdateAxisSuffix,
    onUpdateAxisPrefix,
    yDomain,
    onSetYDomain,
    xColumn,
    yColumn,
    stringColumns,
    numericColumns,
    onSetXColumn,
    onSetYColumn,
    onSetTimeFormat,
    timeFormat,
  } = props

  const handleFillColumnSelect = (column: string): void => {
    const fillColumn = [column]
    onSetFillColumns(fillColumn)
  }

  const handleYColumnSelect = (column: string): void => {
    console.log('entered y-column select')
    let updatedYColumns

    if (yColumn.includes(column)) {
      updatedYColumns = yColumn.filter(col => col !== column)
    } else {
      updatedYColumns = [...yColumn, column]
    }

    onSetYColumn(updatedYColumns)
  }

  const groupDropdownStatus = availableGroupColumns.length
    ? ComponentStatus.Default
    : ComponentStatus.Disabled

  console.log('fillColumns', fillColumns)
  return (
    <Grid.Column>
      <h4 className="view-options--header">Customize Mosaic Plot</h4>
      <h5 className="view-options--header">Data</h5>
      <ColumnSelector
        selectedColumn={fillColumns[0]}
        onSelectColumn={handleFillColumnSelect}
        availableColumns={stringColumns}
        axisName="fill"
      />
      <ColumnSelector
        selectedColumn={xColumn}
        onSelectColumn={onSetXColumn}
        availableColumns={numericColumns}
        axisName="x"
      />
      {/* single select for y-column */}
      {/* <ColumnSelector
        selectedColumn={yColumn}
        onSelectColumn={onSetYColumn}
        availableColumns={stringColumns}
        axisName="y"
      /> */}

      <Form.Element label="Y Column">
        <MultiSelectDropdown
          options={stringColumns}
          selectedOptions={yColumn}
          onSelect={handleYColumnSelect}
          buttonStatus={groupDropdownStatus}
        />
      </Form.Element>

      <Form.Element label="Time Format">
        <TimeFormat
          timeFormat={timeFormat}
          onTimeFormatChange={onSetTimeFormat}
        />
      </Form.Element>
      <h5 className="view-options--header">Options</h5>
      <Form.Element label="Color Scheme">
        <HexColorSchemeDropdown
          colorSchemes={GIRAFFE_COLOR_SCHEMES}
          selectedColorScheme={colors}
          onSelectColorScheme={onSetColors}
        />
      </Form.Element>
      <h5 className="view-options--header">X Axis</h5>
      <Form.Element label="X Axis Label">
        <Input
          value={xAxisLabel}
          onChange={e => onSetXAxisLabel(e.target.value)}
        />
      </Form.Element>
      <h5 className="view-options--header">Y Axis</h5>
      <Form.Element label="Y Axis Label">
        <Input
          value={yAxisLabel}
          onChange={e => onSetYAxisLabel(e.target.value)}
        />
      </Form.Element>
      <Grid.Row>
        <AxisAffixes
          prefix={yPrefix}
          suffix={ySuffix}
          axisName="y"
          onUpdateAxisPrefix={prefix => onUpdateAxisPrefix(prefix, 'y')}
          onUpdateAxisSuffix={suffix => onUpdateAxisSuffix(suffix, 'y')}
        />
      </Grid.Row>
      <AutoDomainInput
        domain={yDomain as [number, number]}
        onSetDomain={onSetYDomain}
        label="Y Axis Domain"
      />
    </Grid.Column>
  )
}

const mstp = (state: AppState) => {
  const availableGroupColumns = getGroupableColumns(state)
  const fillColumns = getMosaicFillColumnsSelection(state)
  const xColumn = getXColumnSelection(state)
  const yColumn = getMosaicYColumnSelection(state)
  const stringColumns = getStringColumns(state)
  const numericColumns = getNumericColumns(state)
  const view = getActiveTimeMachine(state).view as NewView<MosaicViewProperties>
  const {timeFormat} = view.properties

  return {
    availableGroupColumns,
    fillColumns,
    xColumn,
    yColumn,
    stringColumns,
    numericColumns,
    timeFormat,
  }
}

const mdtp = {
  onSetFillColumns: setFillColumns,
  onSetColors: setColorHexes,
  onSetYAxisLabel: setYAxisLabel,
  onSetXAxisLabel: setXAxisLabel,
  onUpdateAxisPrefix: setAxisPrefix,
  onUpdateAxisSuffix: setAxisSuffix,
  onSetYDomain: setYDomain,
  onSetXColumn: setXColumn,
  onSetYColumn: setMosaicYColumn,
  onSetTimeFormat: setTimeFormat,
}

const connector = connect(mstp, mdtp)
export default connector(MosaicOptions)
